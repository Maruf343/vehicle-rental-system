    import { Request, Response } from "express";
    import { vehicleService } from "./vehicle.service";
    import { userService } from "../users/user.service";

    const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.createVehicleIntoDB(req.body);
        return res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    };
    const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehiclesFromDB();
        return res.status(201).json({
        success: true,
        message: result.rows.length
            ? "Vehicles retrieved successfully"
            : "No vehicles found",
        data: result.rows,
        });
    } catch (error: any) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    };
    const getVehicleById = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicleService.getVehicleByIdFromDB(
        vehicleId as string,
        );
        if (result.rowCount === 0) {
        return res.status(404).json({
            success: false,
            message: "vehicle not found",
        });
        }
        return res.status(200).json({
        success: true,
        message: "vehicle fetched successfully",
        data: result.rows[0],
        });
    } catch (error: any) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    };
    const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicleService.updateVehicleIntoDB(
        req.body,
        vehicleId as string,
        );
        if (result.rowCount === 0) {
        return res.status(404).json({
            success: false,
            message: "vehicle not found",
        });
        }
        return res.status(200).json({
        success: true,
        message: "vehicle updated successfully",
        data: result.rows[0],
        });
    } catch (error: any) {
        if (error.code === "23505") {
        return res.status(409).json({
            success: false,
            message: "Registration number already exists",
        });
        }
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    };
    const deleteVehicle = async(req: Request, res: Response) =>{
        try{
            const {vehicleId} = req.params;
            const result = await vehicleService.deleteVehicleFromDB(vehicleId as string)
            if(result.rowCount === 0){
                return res.status(404).json({
                    success: false,
                    message: "vehicle not found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "vehicle deleted successfully",
            })
        }catch(error: any){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }




    export const vehicleController = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    };
