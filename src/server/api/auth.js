import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { accessAuth, auth } from '../middlewares/auth'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'
const authApi = new Hono()

authApi.use(accessAuth) 

authApi.post('/api/auth/register', async(c)=> {
    const body = await c.req.json()
    const { email, password } = body
    const db = drizzle(c.env.DB, {schema})
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const [user] =await db
        .insert(schema.user)
        .values({email, passwordHash})
        .returning()
        
        return c.json({success:true}, 201)
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})

authApi.post('/api/auth/login', async(c)=> {
    const {email, password} = await c.req.json()
    const db = drizzle(c.env.DB, {schema})
    
    try {
        const [user] = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.email, email))
        
        if(user){
            const valid = await bcrypt.compare(password, user.passwordHash)
            if(!valid) return c.json({error:'Invalid credentials'}, 401)
            
            const token = await sign({sub: user.id, email}, c.env.JWT, 'HS256')
    
            setCookie(c, 'auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 60 * 60 *24
            })
            
            return c.json({success:true, user: user.email, id: user.id})

        }
        return c.json({success: false}, 404)
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})
authApi.get('/api/auth/logout', auth, async(c)=> {
    deleteCookie(c, 'auth_token')
    return c.json({loggedIn: false})

})

authApi.get('/api/auth/check', auth, async(c)=> {
    const user = c.get('user')

    return user?  c.json({loggedIn: true,user: user.email}) : c.json({loggedIn: false})
})

authApi.delete('/api/auth/users', async(c) => {
    const db = drizzle(c.env.DB, {schema})
    try{
        await db
        .delete(schema.user)
        return c.json({success:true}, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})




export default authApi
