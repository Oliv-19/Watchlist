import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'
import axios from 'axios'
const peopleApi = new Hono()

peopleApi.post('/api/people', async(c) => {
    const {cast, castMedia} = await c.req.json()  
    const db = drizzle(c.env.DB, {schema})
    try{
        const result = await db.batch([
            db.insert(schema.people).values(cast.slice(0, (cast.length-1)/2)).returning().onConflictDoNothing(),
            db.insert(schema.people).values(cast.slice((cast.length-1)/2)).returning().onConflictDoNothing(),
            db.insert(schema.peopleMedia).values(castMedia).returning()
        ])
        
        return c.json({success: true}, 201)
        
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})

peopleApi.delete('/api/people', async(c) => {
    const db = drizzle(c.env.DB, {schema})
    try{
        const deletedPeople = await db
        .delete(schema.people)
        return c.json({success:true}, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

export default peopleApi