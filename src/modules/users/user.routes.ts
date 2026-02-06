import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/",auth(), userController.getAllUser);
router.get("/:id",auth(), userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id",auth(), userController.deleteUser)

export const userRoute = router;