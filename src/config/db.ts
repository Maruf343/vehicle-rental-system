import { config } from 'dotenv';
import { Pool } from 'pg';

config();

export const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STRING}`
})

// DB
const initDB = async () =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(250) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'customer',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
        `)
        console.log("connected db");
}
export default initDB;