import { Router } from "express";
import { bookingController } from "./booking.controller";
import { Roles } from "../../auth/auth.constant";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", bookingController.createBooking)
router.get("/",auth(Roles.user,Roles.admin), bookingController.getAllBookings)
router.put("/:bookingId",auth(Roles.user,Roles.admin), bookingController.updateBookingById)

export const bookingRoute = router;