import { NextFunction, Request, Response } from "express";

const verify = (req: Request, res:Response, next:NextFunction)=>{
    const ID = true;
    if(!ID){
        throw new Error("Unauthorized")
    }
    next();
}
export default verify;