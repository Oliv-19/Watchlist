import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'
import { eq, sql } from 'drizzle-orm'
import axios from 'axios'
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

mediaApi.post('/api/media', async(c) => {
    const {mediaObj, genreMedia} = await c.req.json()  
    const db = drizzle(c.env.DB, {schema})
    try{
        const result = await db.batch([
            db.insert(schema.media).values(mediaObj).returning().onConflictDoNothing(),
            db.insert(schema.mediaGenres).values(genreMedia).returning()
        ])
        
        return c.json({success: true}, 201)
        
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})

mediaApi.get('/api/media/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const result = await db.query.media.findFirst({
            where: eq(schema.media.id, id),
            with: { mediaGenres: { with: { genre: { columns: { name:true}}}},
                peopleMedia: {with: {people: { columns: { name:true, profilePath: true, order: true}}}}
            }
        })
        
        const response = {
            ...result,
            genres: result.mediaGenres.map((g) => g.genre.name),
            cast: result.peopleMedia.map((p) => ({
                id: p.peopleId,
                name: p.people.name,
                profilePath: p.people.profilePath,
                order: p.people.order,
                character: result.characters? result.characters.find(char => char.id == p.peopleId)?.character : null

            })),
            mediaGenres: undefined,
            peopleMedia: undefined,
            characters: undefined
        }
        return c.json(response)  
    } catch (error){
        console.error(error.cause)
        return c.json({success:false}, 400)
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