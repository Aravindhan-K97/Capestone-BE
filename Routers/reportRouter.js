import express from "express";
import {
  getRolePromotionReport,
  getEmployeeWorkPeriodReport,
  handleGenerateRolePromotionPDF,
  handleGenerateEmployeeWorkPeriodPDF
} from "../Controllers/reportController.js";

const router = express.Router();

router.get("/role-promotion-report", getRolePromotionReport);
router.get("/work-period-report", getEmployeeWorkPeriodReport);
router.get('/role-promotion-report/pdf/:id', handleGenerateRolePromotionPDF);
router.get('/work-period-report/pdf/:id', handleGenerateEmployeeWorkPeriodPDF);

export default router;
