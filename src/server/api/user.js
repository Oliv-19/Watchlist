import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import * as schema from '../db/schema'
import { accessAuth, auth } from "../middlewares/auth"
import { eq } from "drizzle-orm"

const userApi = new Hono()
userApi.use(accessAuth)

userApi.get('/api/user/media', auth, async(c)=> {
    const db = drizzle(c.env.DB, {schema})
    const user = c.get('user')
    
    
    try{
        const result = await db
        .select({
            userId: schema.userMedia.userId,
            media: schema.media 
        })
        .from(schema.userMedia)
        .leftJoin(schema.media, eq(schema.userMedia.mediaId, schema.media.id))
        .where(eq(schema.userMedia.userId, user.sub));   
        return c.json(result, 200)
    } catch (error) {
        console.error(error);
        
        return c.json({success: false}, 400)
    }
})


userApi.get('/api/user/media/:id', auth, async(c)=> {
    const id = await c.req.param('id')
    console.log(id);
    
    const db = drizzle(c.env.DB, {schema})
    const user = c.get('user')
    
    try{
        const result = await db
        .insert(schema.userMedia)
        .values({
            mediaId: id,
            userId: user.sub
        })
        return c.json({success: true}, 201)
    } catch (error) {
        console.error(error);
        
        return c.json({success: false}, 400)
    }
})

export default userApi