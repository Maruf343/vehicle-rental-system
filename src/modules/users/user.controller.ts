import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB()
    return res.status(201).json({
      success: true,
      message: "user fetched successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const result = await userService.getUserByIdFromDB(id as string)
        if(result.rowCount === 0){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: result.rows[0],
        })
    }catch(error: any){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const updateUser = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const result = await userService.updateUserIntoDB(req.body, req.params.id as string)
        if(result.rowCount === 0){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: result.rows[0],
        })
    }catch(error: any){
        return res.status(500).json({
            success : false,
            message: error.message,
        })
    }
}

const deleteUser = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const result = await userService.deleteUserFromDB(id as string)
        if(result.rowCount === 0){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "user deleted successfully",
        })
    }catch(error: any){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const userController = {
    getAllUser,getUserById,updateUser,deleteUser
}