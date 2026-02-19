import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookingsFromDB(req.user);
    res.status(200).json({
      success: true,
      message: "All bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingById = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.updateBookingByIdFromDB(
      Number(req.params.bookingId),
      req.body.status,
      req.user,
    );
    res.status(200).json({
      success: true,
      message:
        req.body.status === "returned"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBookingById,
};
