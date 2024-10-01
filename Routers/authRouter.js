import express from "express";
import { forgotPassword, loginEmployee, registerEmployee, resetPassword } from "../Controllers/authController.js";


const router = express.Router();

router.post("/register-emp", registerEmployee); 
router.post("/login-emp", loginEmployee);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;