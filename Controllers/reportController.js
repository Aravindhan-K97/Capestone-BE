import RoleHistory from "../Models/roleHistorySchema.js";
import Employee from "../Models/employeeSchema.js";
import { generateRolePromotionPDF, generateEmployeeWorkPeriodPDF } from "../Services/pdfGenerator.js";

//Function to get the promotion details of the employees
export const getRolePromotionReport = async (req, res) => {
  try {
    const roleHistories = await RoleHistory.find()
      .populate("employee", "userName")
      .populate("oldRole", "role")
      .populate("newRole", "role");

    res.status(200).json({
      message: "Role Promotion Report Fetched Successfully",
      result: roleHistories,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Fetch Role Promotion Report, Internal Server Error" });
  }
};

//Function to get the working period of the employees
export const getEmployeeWorkPeriodReport = async (req, res) => {
  try {
    const employees = await Employee.find().populate('role', 'role').populate('department', 'departmentName');
    const reports = employees.map(employee => {
      return {
        _id:employee._id,
        userName: employee.userName,
        department: employee.department?employee.department.departmentName : "Not Yet Assigned",
        role: employee.role.role,
        dateOfJoining: employee.dateOfJoining,
        workPeriod: Math.floor((Date.now() - new Date(employee.dateOfJoining)) / (1000 * 60 * 60 * 24 * 30)), // Convert to months
      };
    });

    res.status(200).json({
      message: "Employee Work Period Report Fetched Successfully",
      result: reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Fetch Work Period Report, Internal Server Error" });
  }
};

// Function to generate PDFs on promotion details of an employee
export const handleGenerateRolePromotionPDF = async (req, res) => {
  try {
    const {id} = req.params
    const roleHistories = await RoleHistory.find({employee:id})
      .populate("employee", "userName")
      .populate("oldRole", "role")
      .populate("newRole", "role");

    generateRolePromotionPDF(roleHistories, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Generate PDF, Internal Server Error" });
  }
};

// Function to generate PDFs on working period details of an employee
export const handleGenerateEmployeeWorkPeriodPDF = async (req, res) => {
  try {
    const {id} = req.params;
    const employees = await Employee.find({_id:id}).populate('role', 'role').populate('department', 'departmentName');
    const reports = employees.map(employee => {
      return {
        _id: employee._id,
        userName: employee.userName,
        department: employee.department.departmentName,
        role: employee.role.role,
        dateOfJoining: employee.dateOfJoining,
        workPeriod: Math.floor((Date.now() - new Date(employee.dateOfJoining)) / (1000 * 60 * 60 * 24 * 30)), // Convert to months
      };
    });

    generateEmployeeWorkPeriodPDF(reports, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Generate PDF, Internal Server Error" });
  }
};


