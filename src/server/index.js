import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
const app = new Hono()

app.use(accessAuth) 

app.post('/api/media', async(c) => {
    const body = await c.req.json()
    const db = drizzle(c.env.DB)
    const media = {
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
        .insert(schema.media)
        .values(media)
        .returning()
        return c.json({success:true, user: result}, 201)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

app.post('/api/populate', async(c) => {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${c.env.VITE_API_KEY}`
        }
    };
    try{
        const res = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
        const data = await res.json()
        const onAir = c.env.DB.prepare('INSERT INTO onAir (media_id) VALUES (?)')
        const inserts = data.results.map((item) =>
            onAir.bind(item.id)
        )

        await c.env.DB.batch(inserts)
        
        return c.json({ success: true, message: inserts });

    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})
app.post('/api/onAir', async(c) => {
    const body = await c.req.json()
    const db = drizzle(c.env.DB)
    try{
        const [result] = await db
        .insert(schema.onAir)
        .values({mediaId: body.mediaId})
        .returning()
        return c.json({success:true, user: result}, 201)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})
app.delete('/api/onAir/:id', async(c) => {
    const id = await c.req.param('id')
    
    const db = drizzle(c.env.DB)
    try{
        const deletedMedia = await db
        .delete(schema.onAir)
        .where(eq(schema.onAir.id, id))
        .returning();
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

export default app