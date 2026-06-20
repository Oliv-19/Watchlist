import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { jwtVerify, createRemoteJWKSet, errors } from "jose";

export const accessAuth = createMiddleware(async(context, next)=>{
  if(context.env.ENVIRONMENT === "development"){
        return await next()
    }
    if (!context.env.POLICY_AUD) {
      return context.json('Missing required audience', 403)
    }
    const token = context.req.header("cf-access-jwt-assertion");
    if (!token) {
      return context.json('Missing required CF Access JWT', 403)
    }
    try {
      const JWKS = createRemoteJWKSet(
        new URL(`${context.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
      );
      await jwtVerify(token, JWKS, {
        issuer: context.env.CF_ACCESS_DOMAIN,
        audience: context.env.POLICY_AUD,
      });
      await next()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return context.json(`Invalid token: ${message}`, 403)
    }
})
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