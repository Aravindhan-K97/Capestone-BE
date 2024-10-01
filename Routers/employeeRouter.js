import express from "express";
import {
  assignRole,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  getEmployeeById,
  getEmployeeToAssignRole,
  updateEmployee,
} from "../Controllers/employeeController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


router.get("/get-emp", authMiddleware, getEmployee);
router.get("/get-employee-by-id/:id", getEmployeeById);
router.get("/get-all-emp", getAllEmployees);
router.get("/employee-assign-role/:id", getEmployeeToAssignRole);
router.put("/assign-role/:id", assignRole);
router.delete("/delete-employee/:id", deleteEmployee);
router.put("/update-employee/:id", updateEmployee);

export default router;
