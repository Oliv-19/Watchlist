import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
import { eq } from 'drizzle-orm'
const mediaApi = new Hono()

mediaApi.use(accessAuth) 

mediaApi.post('/api/media', async(c) => {
    const body = await c.req.json()
    const db = drizzle(c.env.DB)
    console.log('api', body)
    try{
        const [result] = await db
        .insert(schema.media)
        .values(body)
        .returning()
        return c.json({success:true, user: result}, 201)
    } catch (error){
        return c.json({success:false, message: error.message}, 400)
    }
})

export default mediaApi