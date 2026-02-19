import { pool } from "../../config/db";

const createBookingIntoDB = async (data: any) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    data.vehicle_id,
  ]);
  const vehicle = result.rows[0];
  if (!vehicle || vehicle.availability_status !== "available") {
    throw new Error("Vehicle not available");
  }
  if (!vehicle) {
    throw new Error("vehicle not found");
  }

  const rentStartDate = new Date(data.rent_start_date);
  const rentEndDate = new Date(data.rent_end_date);
  const days =
    Math.ceil(rentEndDate.getTime() - rentStartDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (days <= 0) {
    throw new Error("Invalid rental dates");
  }
  const totalPrice = days * vehicle.daily_rent_price;

  const bookingResult = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING*`,
    [
      data.customer_id,
      data.vehicle_id,
      data.rent_start_date,
      data.rent_end_date,
      totalPrice,
    ],
  );
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [data.vehicle_id],
  );
  return {
    id: bookingResult.rows[0].id,
    customer_id: bookingResult.rows[0].customer_id,
    vehicle_id: bookingResult.rows[0].vehicle_id,
    rent_start_date: bookingResult.rows[0].rent_start_date,
    rent_end_date: bookingResult.rows[0].rent_end_date,
    total_price: bookingResult.rows[0].total_price,
    status: bookingResult.rows[0].status,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getAllBookingsFromDB = async (user: any) => {
  if (user.role === "admin") {
    const result = await pool.query(
      `SELECT b.*, u.name, u.email, v.vehicle_name, v.registration_number 
            FROM bookings b
            JOIN users u ON b.customer_id = u.id
            JOIN vehicles v ON b.vehicle_id = v.id
            `,
    );
    return result.rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      customer: {
        name: row.name,
        email: row.email,
      },
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));
  }
  const res = await pool.query(
    `
    SELECT b.*, v.vehicle_name, v.registration_number, v.type
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id=v.id
    WHERE b.customer_id=$1
  `,
    [user.id],
  );

  return res.rows.map((row) => ({
    id: row.id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: Number(row.total_price),
    status: row.status,
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
      type: row.type,
    },
  }));
};
const updateBookingByIdFromDB = async(bookingId: number ,status:string,user:any) => {
  const bookingRes = await pool.query(
    `SELECT 
    id,
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status
  FROM bookings WHERE id=$1`,
    [bookingId]
  );

  const booking = bookingRes.rows[0];
  if (!booking) throw new Error("Booking not found");

  if (status === "cancelled") {
    if (user.role !== "customer" || booking.customer_id !== user.id)
      throw new Error("Forbidden");

    if (new Date(booking.rent_start_date) <= new Date())
      throw new Error("Cannot cancel after start date");
  }

  if (status === "returned" && user.role !== "admin") {
    throw new Error("Forbidden");
  }

  await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2`,
    [status, bookingId]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
    [booking.vehicle_id]
  );

  return {
  id: booking.id,
  customer_id: booking.customer_id,
  vehicle_id: booking.vehicle_id,
  rent_start_date: booking.rent_start_date,
  rent_end_date: booking.rent_end_date,
  total_price: Number(booking.total_price),
  status: status,
};
;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingByIdFromDB
};
