import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { genres, media } from '../db/schema'
import * as schema from '../db/schema'
import { eq, sql } from 'drizzle-orm'
import axios from 'axios'
const mediaApi = new Hono()

mediaApi.use(accessAuth) 
mediaApi.get('/api/media', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const result = await db.select().from(media)
        return c.json(result);
    } catch (error){
        return c.json({success:false}, 400)
    }
})

mediaApi.post('/api/media', async(c) => {
    const body = await c.req.json()  
    const db = drizzle(c.env.DB, {schema})
    const mediaObj = {
        mediaId: body.id,
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
        genres: body.genres.map(g=> g.id),
        characters: body.credits.cast,
        similar: body.recommendations.results,
    }

    
    try{
        const [result] = await db
        .insert(media)
        .values(mediaObj)
        .returning()
        return c.json(result, 201)
    } catch (error){
        return c.json({success:false}, 400)
    }
})

mediaApi.get('/api/media/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const [result] = await db.select()
        .from(media)
        .where(eq(media.mediaId, Number(id)))
        .limit(1);
        return c.json(result);
    } catch (error){
        return c.json({success:false, mg: error.message}, 400)
    }
})

mediaApi.delete('/api/media/:id', async(c) => {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    try{
        const deletedMedia = await db
        .delete(media)
        .where(eq(media.id, id))
        .returning();
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        return c.json({success:false}, 400)
    }
})

mediaApi.delete('/api/media', async(c) => {
    const db = drizzle(c.env.DB, {schema})
    try{
        const deletedMedia = await db
        .delete(media)
        return c.json({success:true}, 200)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

export default mediaApi