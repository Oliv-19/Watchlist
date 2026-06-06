import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import * as schema from '../db/schema'
import { fetchAiringToday, fetchOnAir } from "./onAirHelper"
import { accessAuth } from "../middlewares/auth"

const todayApi = new Hono()
todayApi.use(accessAuth)
todayApi.get('/api/today', async(c)=> {
    const KV = c.env.AIRING_TODAY
    const cached = await KV.get('airing_today', {type: 'json'})

    if(cached){
        return c.json(cached)
        
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    try{
        const airingToday = await fetchAiringToday(options, KV)
        await KV.put('airing_today', JSON.stringify(airingToday), {expirationTtl: 86400})
        return c.json(airingToday, 200)

        return c.json(result, 200)
    } catch (error){
        console.error(error)
        return c.json({success:false}, 400)
    }
})


todayApi.get('/api/onAir', async(c)=> {
    const KV = c.env.ON_AIR
    const cached = await KV.get('on_air', {type: 'json'})

    if(cached){
        return c.json(cached)
        
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    try{
        console.log('Empty table');
        const onAir = await fetchOnAir(options)
        await KV.put('on_air', JSON.stringify(onAir), {expirationTtl: 604800})
        return c.json(onAir, 200)
        
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

export default todayApi