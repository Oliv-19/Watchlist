import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'
import { getPerson, responseFormat } from './peopleHelpers'
const peopleApi = new Hono()

peopleApi.use(accessAuth) 
peopleApi.get('/api/people/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    try{
        const result = await db.query.people.findFirst({
            where: eq(schema.people.id, id),
        })
        if(result){
            const res = await responseFormat(result, id, options)
            return c.json(res, 200)  
        }else{

            const person = await getPerson(id, options)
            const [response] = await db.insert(schema.people)
            .values(person)
            .returning()
            return c.json(person, 201)
        }
    
        
    } catch (error){
        console.error(error)
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