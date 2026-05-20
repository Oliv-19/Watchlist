import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { media } from '../db/schema'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
const mediaApi = new Hono()

mediaApi.use(accessAuth) 

mediaApi.get('/api/media', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB)
    
    try{
        const result = await db.select().from(media)
  
        return c.json(result);
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

mediaApi.post('/api/media', async(c) => {
    const body = await c.req.json()
    const db = drizzle(c.env.DB)
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
        releaseDate: `${format(new Date(body.first_air_date), 'MMM d, y')} - ${format(new Date(body.last_air_date), 'MMM d, y')}`,
        genres: body.genres,
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
        return c.json({success:false, message: error.message}, 400)
    }
})

mediaApi.get('/api/media/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB)
    
    try{
        const [result] = await db.select()
        .from(media)
        .where(eq(media.mediaId, Number(id)))
        .limit(1);
  
        return c.json(result);
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

mediaApi.delete('/api/media/:id', async(c) => {
    const id = await c.req.param('id')
    
    const db = drizzle(c.env.DB)
    try{
        const deletedMedia = await db
        .delete(media)
        .where(eq(media.id, id))
        .returning();
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

export default mediaApi