import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

export const accessAuth = createMiddleware(async(context, next)=>{
    if(context.env.ENVIRONMENT === "development"){
        await next()
    }
    if (!context.env.POLICY_AUD) {
      return context.json('Missing required audience', 403)
    }

    // Get the JWT from the request headers
    const token = context.req.header("cf-access-jwt-assertion");

    // Check if token exists
    if (!token) {
      return context.json('Missing required CF Access JWT', 403)
    }

    try {
      // Create JWKS from your team domain
      const JWKS = createRemoteJWKSet(
        new URL(`${context.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
      );

      // Verify the JWT
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