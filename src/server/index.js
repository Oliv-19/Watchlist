import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { onAir } from './db/schema'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
import mediaApi from './api/media'
const app = new Hono()

app.use(accessAuth) 
app.route('/', mediaApi)
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
        const onAirDB = c.env.DB.prepare('INSERT INTO onAir (media_id) VALUES (?)')
        const inserts = data.results.map((item) =>
            onAirDB.bind(item.id)
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
        .insert(onAir)
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
        .delete(onAir)
        .where(eq(onAir.id, id))
        .returning();
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

export default app