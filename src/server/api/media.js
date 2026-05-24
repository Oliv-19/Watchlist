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
    const body = await c.req.json()  
    const db = drizzle(c.env.DB, {schema})
    const mediaObj = {
        id: body.id,
        backdropPath : body.backdrop_path,
        creators: body.created_by,
        title: body.name,
        originalTitle: body.original_name,
        posterPath:  body.poster_path,
        overview:  body.overview,
        rating:  body.vote_average,
        seasons: body.number_of_seasons,
        episodes: body.number_of_episodes,
        episodeRunTime: body.episode_run_time,
        releaseDate: body.first_air_date,
        finishedDate: body.last_air_date,
        characters: body.credits.cast,
    }
    const genres = body.genres.map((genre) => ({
        mediaId: mediaObj.id,
        genreId: genre.id
    }))
    try{
        const result = await db.batch([
            db.insert(schema.media).values(mediaObj).returning({id: schema.media.id}),
            db.insert(schema.mediaGenres).values(genres).returning()
        ])
        return c.json(result, 201)
        
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
            with: { mediaGenres: { with: { genre: { columns: { name:true}}}}}
        })
        const response = {
            ...result,
            genres: result.mediaGenres.map((g) => g.genre.name),
            mediaGenres: undefined
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