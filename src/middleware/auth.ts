import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles:string[]) =>{
    return async (req: Request,res: Response, next: NextFunction)=>{
        const token = req.headers.authorization;
        if(!token){
            throw new Error("You are not authorized")
        }
        const decode = jwt.verify(token, config.jwtSecret as string)as JwtPayload;
        const user = await pool.query(
            `
            SELECT * FROM users WHERE email=$1
            `,
            [decode.email]
        );
        if(user.rows.length === 0){
            throw new Error("User not found")
        }
        req.user= decode;
        if(roles.length > 0 && !roles.includes(decode.role)){
            throw new Error("You are not authorized")
        }
        next();
    }
}
export default auth;