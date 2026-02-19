import bcrypt from "bcryptjs"
import { pool } from "../config/db"
import jwt from "jsonwebtoken";

const signUpUserIntoDB = async(payload: Record<string, unknown>)=>{
    const {name,email,phone,password,role} = payload;
    const hashPassword = await bcrypt.hash(password as string, 12)

    const result = await pool.query(
            `INSERT INTO users (name,email,phone,password,role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`,
            [name,email,phone,hashPassword,role]
    )
    return result;
}
const loginUserIntoDB = async(email: string, password:string)=>{
    const user = await pool.query(
        `SELECT * FROM users WHERE email=$1`, [email]
    )
    const matchPassword = await bcrypt.compare(password, user.rows[0].password);
    if(user.rows.length === 0){
        throw new Error("User not found")
    }
    if(!matchPassword){
        throw new Error("Invalid credentials")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name,
        role: user.rows[0].role
    }
    const token = jwt.sign(jwtPayload,process.env.JWT_SECRET as string,{expiresIn: "7d"})
    delete user.rows[0].password;
    delete user.rows[0].created_at;
    delete user.rows[0].updated_at;

    return {token,user: user.rows[0]};
}

export const authService = {
    signUpUserIntoDB,loginUserIntoDB
}