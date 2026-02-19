import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getAllUserFromDB = async()=>{
    const result =await pool.query(
        `SELECT id,name,email,phone,role,created_at FROM users`
    )
    return result;
}

const getUserByIdFromDB = async(id:string)=>{
    const result = await pool.query(
        `SELECT id,name,email,phone,role,created_at FROM users WHERE id = $1`,
        [id]
    )
    return result.rows[0];
}
const updateUserIntoDB = async(payload: Record<string,unknown>, id:string)=>{
    const {name,email,phone} = payload;
    const result = await pool.query(
        `UPDATE users SET name=$1, email=$2 , phone=$3 WHERE id=$4 RETURNING *`,
        [name,email,phone,id]
    )
    return result
}

const deleteUserFromDB = async(id:string)=>{
    const result = await pool.query(
        `DELETE FROM users WHERE id =$1`,[id]
    )
    return result;
}

export const userService = {
    getAllUserFromDB,getUserByIdFromDB,updateUserIntoDB,deleteUserFromDB
}