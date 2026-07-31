import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'
const genresApi = new Hono()


genresApi.get('/api/genre', async(c) => {
    const db = drizzle(c.env.DB, {schema})
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    try{
        const result = await db
        .select()
        .from(schema.genres)
        .all()
        if (!result || result.length == 0){
            console.log('fetch');
            
            const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options);
            const {genres} = await response.json()
            
            await db.batch([
                db.insert(schema.genres).values(genres).onConflictDoNothing(),

            ])
            
            return c.json(genres, 201)
        }
        return c.json(result, 200)

    } catch (error){
        console.error(error);
        
        return c.json({success:false}, 400)
    }
})

genresApi.get('/api/genre/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB)
    
    try{
        const result = await db.select()
        .from(genres)
        .where(eq(genres.id), Number(id))
        .limit(1)
        return c.json(result);
    } catch (error){
        return c.json({success:false}, 400)
    }
})

genresApi.delete('/api/genre', async(c) => {
    const db = drizzle(c.env.DB)
    try{
        const deletedMedia = await db
        .delete(genres)
        .returning();
        return c.json({success:true}, 200)
    } catch (error){
        return c.json({success:false}, 400)
    }
})

export default genresApi