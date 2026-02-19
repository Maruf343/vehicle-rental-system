import { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) =>{
    try{
        const result = await authService.signUpUserIntoDB(req.body)
        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            data: result.rows[0],
        })
    }catch(error: any){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const loginUser = async (req: Request, res: Response)=>{
    try {
        const result = await authService.loginUserIntoDB(req.body.email,req.body.password)
        return res.status(200).json({
          success: true,
          message: "user logged in successfully",
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}


export const authController = {
  loginUser,signUpUser
};
