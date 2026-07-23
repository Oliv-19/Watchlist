import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'
import { eq, sql } from 'drizzle-orm'
import { dbFormatedResponse, fetchMedia } from './mediaHelpers'
const mediaApi = new Hono()

mediaApi.use(accessAuth) 
mediaApi.get('/api/media', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const result = await db.select().from(schema.media)
        return c.json(result);
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

mediaApi.get('/api/media/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    const user = c.get('user')
    try{
        const result = await db.query.media.findFirst({
            where: eq(schema.media.id, id),
            with: { mediaGenres: { with: { genre: { columns: { name:true}}}},
                peopleMedia: {with: {people: { columns: { name:true, profilePath: true, order: true}}}},
                userMedia: {
                    where: (userMedia, { eq }) => user && eq(userMedia.userId, user.sub),
                    columns: { userRating: true, userReview:true, status:true}
                }
            }
        })
        if(result) { 
            if(Object.hasOwn(result, 'originCountry') && result.originCountry === 'origin_country'){
                const media = await fetchMedia(id, options)
                if(!media) return c.json({success: false}, 400)
                const {mediaObj, response} = media
                await db.update(schema.media)
                .set({originCountry: mediaObj.originCountry})
                .where(eq(schema.media.id, result.id))
                return c.json(response, 201)

            } else if(!result.releaseDate){
                const media = await fetchMedia(id, options)
                if(!media) return c.json({success: false}, 400)
                    const {mediaObj, response} = media
                if(!mediaObj.releaseDate) return c.json(response, 200)
                await db.update(schema.media)
                .set({releaseDate: mediaObj.releaseDate})
                .where(eq(schema.media.id, result.id))
                
                return c.json(response, 201)

            } else{
                console.log('idk');
                
                const response = await dbFormatedResponse(id, options, result)
                return c.json(response, 200)  
            }
        }else {
            const media = await fetchMedia(id, options)
            if(!media) return c.json({success: false}, 400)
            const {mediaObj, genreMedia, response, cast, castMedia} = media
            
            const result = await db.batch([
                db.insert(schema.media).values(mediaObj).onConflictDoNothing(),
                genreMedia?.length > 0 && db.insert(schema.mediaGenres).values(genreMedia).onConflictDoNothing(),
            ])
            
            if( cast.length > 0 && castMedia.length > 0){
                const idk = await db.batch([
                    db.insert(schema.people).values(cast.slice(0, (cast.length-1)/2)).returning().onConflictDoNothing(),
                    db.insert(schema.people).values(cast.slice((cast.length-1)/2)).returning().onConflictDoNothing(),
                    db.insert(schema.peopleMedia).values(castMedia).returning().onConflictDoNothing()   
                ])
            }
            
            return c.json(response, 201)
        }
    } catch (error){
        console.error(error)
        return c.json({success: false}, 400)
    }
})

mediaApi.delete('/api/media/:id', async(c) => {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const deletedMedia = await db
        .delete(schema.media)
        .where(eq(schema.media.id, id))
        .returning();
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

mediaApi.delete('/api/media', async(c) => {
    const db = drizzle(c.env.DB, {schema})
    try{
        const deletedMedia = await db
        .delete(schema.media)
        return c.json({success:true}, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

export default mediaApi