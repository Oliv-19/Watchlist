import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
import mediaApi from './api/media'
import genresApi from './api/genres'
import peopleApi from './api/people'
import { fetchOnAir, searchMedia } from './api/mediaHelpers'
const app = new Hono()

app.use(accessAuth) 
app.route('/', mediaApi)
app.route('/', genresApi)
app.route('/', peopleApi)

app.get('/api/search/:query/:page', async(c)=> {
    const query = await c.req.param('query')
    const page = await c.req.param('page')
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMBD_API_KEY}`
        }
    }
    try{
        const result = await searchMedia(query, page, options)
        if(result){
            return c.json(result.data, 200)
        }
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

app.get('/api/onAir', async(c)=> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${c.env.TMBD_API_KEY}`
        }
    }
    try{
        // const result = await fetchOnAir(options)
        const result = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
        const res = result.ok && await result.json()
        
        if(res){
            return  c.json(res, 200)
        }
    } catch (error){
        console.error(error.cause);
        return c.json({success:false, error}, 400)
    }
})

export default app