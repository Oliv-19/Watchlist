import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
const app = new Hono()

app.use(accessAuth) 

app.post('/api/popular', async(c) => {
    const body = await c.req.json()
    const db = drizzle(c.env.DB)
    // try{
    //     const [result] = await db
    //     .insert(schema.popular)
    //     .values({seriesId:body.id, name: body.name, posterPath: body.poster_path})
    //     .returning()
    //     return c.json({success:true, user: result}, 201)
    // } catch (error){
    //     return c.json({success:false, message: error.message}, 400)
    // }
})

app.get('/api/users', async(c) => {
    const db = drizzle(c.env.DB)
    const result = await db.select().from(schema.user)
    return c.json({success:true, users: result}, 200)
})

export default app