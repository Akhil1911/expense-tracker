import express from "express";
import {
  activeUserController,
  deleteUserController,
  loginController,
  registerController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//ACTIVE USER || GET
router.get("/activeUser/:token", activeUserController);

//DELETE ACCOUNT || DELETE
router.delete("/deleteUser/:email", deleteUserController);

export default router;
