import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
import mediaApi from './api/media'
import genresApi from './api/genres'
import peopleApi from './api/people'
import authApi from './api/auth'
import { searchMedia } from './api/mediaHelpers'
import todayApi from './api/airingToday'
import * as schema from './db/schema'
import { fetchAiringToday, fetchOnAir } from './api/onAirHelper'
import userApi from './api/user'
const app = new Hono()

app.use(accessAuth) 
app.route('/', authApi)
app.route('/', mediaApi)
app.route('/', genresApi)
app.route('/', peopleApi)
app.route('/', todayApi)
app.route('/', userApi)

app.get('/api/search/:query/:page', async(c)=> {
    const query = await c.req.param('query')
    const page = await c.req.param('page')
    console.log(query);
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMDB_API_KEY}`
        }
    }
    try{
        const result = await searchMedia(query, page, options)
        return c.json(result, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

export default {
    fetch: app.fetch,
    async scheduled(event, env, ctx) {
    }
};