import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { jwtVerify, createRemoteJWKSet, errors } from "jose";

export const auth = createMiddleware(async(c, next)=> {
  const token = getCookie(c, 'auth_token')
  
  if(!token) 
    return c.json({error: 'Unauthorized'}, 401)
    
    try{
      const payload = await verify(token, c.env.JWT, 'HS256')
      c.set('user', payload)
    
      await next()
    }catch (error) {
      console.error(error);
      
      return c.json({error: 'Invalid Token'}, 401)
    }
})