import { Hono } from 'hono'
import { accessAuth } from './middlewares/auth'
const app = new Hono()

app.use(accessAuth)

app.get('/api/health', (c) => c.json('Healthy!'))

export default app