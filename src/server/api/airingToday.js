import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import * as schema from '../db/schema'
import { fetchAiringToday } from "./onAirHelper"
import { accessAuth } from "../middlewares/auth"

const todayApi = new Hono()
todayApi.use(accessAuth)
todayApi.get('/api/today', async(c)=> {
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
        .from(schema.airingToday)
        .all()
    
        if(result.length === 0) {
            console.log('Empty table');
            const airingToday = await fetchAiringToday(options, db)
            return c.json(airingToday, 200)
        }

        return c.json(result, 200)
    } catch (error){
        console.error(error.cause)
        return c.json({success:false}, 400)
    }
})

export default todayApi