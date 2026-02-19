import { pool } from "../../config/db";

const createVehicleIntoDB = async (data: any) => {
  const result = await pool.query(
    `
    INSERT INTO vehicles (
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [
      data.vehicle_name,
      data.type,
      data.registration_number,
      data.daily_rent_price,
      data.availability_status || "available",
    ],
  );

  return result.rows[0];
};
const getAllVehiclesFromDB = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};
const getVehicleByIdFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};
const updateVehicleIntoDB = async (data: any, id: string) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      data.vehicle_name,
      data.type,
      data.registration_number,
      data.daily_rent_price,
      data.availability_status,
      id,
    ],
  );
  return result;
};
const deleteVehicleFromDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id =$1`, [id]);
  return result;
};

export const vehicleService = {
  createVehicleIntoDB,
  getAllVehiclesFromDB,
  getVehicleByIdFromDB,
  updateVehicleIntoDB,
  deleteVehicleFromDB,
};
