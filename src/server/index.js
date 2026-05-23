import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
import mediaApi from './api/media'
import genresApi from './api/genres'
const app = new Hono()

app.use(accessAuth) 
app.route('/', mediaApi)
app.route('/', genresApi)

export default app