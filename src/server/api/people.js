import { Hono } from 'hono'
import { accessAuth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'
import axios from 'axios'
import { responseFormat, updatesResponse } from './peopleHelpers'
const peopleApi = new Hono()


peopleApi.patch('/api/people/:id', async(c) => {
    const id = await c.req.param('id')  
    const body = await c.req.json()  
    const db = drizzle(c.env.DB, {schema})

    const updates = {
        biography: body.biography,
        alsoKnownAs: body.also_known_as.slice(0, 3),
        birthday: body.birthday,
        birthplace: body.place_of_birth
    } 
    
    try{
        const [result] = await db.update(schema.people)
        .set(updates)
        .where(eq(schema.people.id, Number(id)))
        .returning()
        
        return c.json(result, 201)
        
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})

peopleApi.get('/api/people/:id', async(c)=> {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.VITE_API_KEY}`
        }
    }
    try{
        const result = await db.query.people.findFirst({
            where: eq(schema.people.id, id),
        })
        if(result.biography){
            const res = await responseFormat(result, id, options)
            return c.json(res, 200)  
        }else{
            const updates = await updatesResponse(id, options)
            const [response] = await db.update(schema.people)
                .set(updates)
                .where(eq(schema.people.id, Number(id)))
                .returning()
            const res = await responseFormat(response, id, options)
            return c.json(res, 201)
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