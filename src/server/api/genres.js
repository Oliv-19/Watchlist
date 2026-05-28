import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { genres, mediaGenres } from '../db/schema'
import { eq } from 'drizzle-orm'
const genresApi = new Hono()

genresApi.use(accessAuth) 

genresApi.post('/api/genre', async(c) => {
    const body = await c.req.json()
    try{
        const genres = c.env.DB.prepare('INSERT INTO genres (id, name) VALUES (?, ?)')
        const inserts = body.genres.map((item) =>
            genres.bind(item.id, item.name)
        )

        await c.env.DB.batch(inserts)
        
        return c.json({ success: true});

    } catch (error){
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
genresApi.get('/api/genre', async(c)=> {
    const db = drizzle(c.env.DB)
    
    try{
        const result = await db.select()
        .from(genres)
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