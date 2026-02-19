import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../../auth/auth.constant";

const router = Router();

router.get("/",auth(Roles.admin), userController.getAllUser);
router.get("/:id",auth(Roles.user), userController.getUserById);
router.put("/:id",auth(Roles.user,Roles.admin), userController.updateUser);
router.delete("/:id",auth(Roles.admin), userController.deleteUser)

export const userRoute = router;