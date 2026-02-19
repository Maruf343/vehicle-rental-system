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
            email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
            password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'customer',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
        CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(150) NOT NULL,
            type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')) NOT NULL,
            registration_number VARCHAR(100) UNIQUE NOT NULL,
            daily_rent_price NUMERIC CHECK (daily_rent_price > 0) NOT NULL,
            availability_status VARCHAR(20) CHECK (availability_status IN ('available', 'booked')) NOT NULL DEFAULT 'available'
        );

        CREATE TABLE IF NOT EXISTS bookings(
           id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE RESTRICT,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE RESTRICT,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price NUMERIC CHECK (total_price > 0) NOT NULL,
            status VARCHAR (20)
            CHECK (status IN ('active', 'cancelled', 'returned'))
            DEFAULT 'active',
            created_at TIMESTAMP DEFAULT NOW(),
            CHECK (rent_end_date > rent_start_date)            
        );
        `);
        console.log("connected db");
}
export default initDB;