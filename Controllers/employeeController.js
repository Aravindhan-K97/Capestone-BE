import Employee from "../Models/employeeSchema.js";
import dotenv from "dotenv";
import Role from "../Models/rolesSchema.js";
import Department from "../Models/departmentSchema.js";
import RoleHistory from "../Models/roleHistorySchema.js";

dotenv.config();

//Function to get the details of the logged in employee
export const getEmployee = async (req, res) => {
  try {
    const employeeId = req.employee._id;
    const employee = await Employee.findById(employeeId);
    res.status(200).json({ message: "Authorized user", data: [employee] });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error Failed to Fetch Employee" });
  }
};

//Get Employee for Profile Page
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id)
      .populate("role", "role responsibilities")
      .populate("department", "departmentName");
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res
      .status(200)
      .json({ message: "Employee Fetched Successfully", result: employee });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Fetch Employee, Internal Server Error" });
  }
};

//Function to get the details of all the registered employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("role", "role") // Populate 'role' field with the 'role' field from Role schema
      .populate("department", "departmentName"); // Populate 'department' field with the 'departmentName' field from Department schema

    res
      .status(200)
      .json({ message: "Employees Fetched Successfully", result: employees });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Cannot Fetch Employees, Internal Server Error" });
  }
};

//Function to get the detail of the employee to role
export const getEmployeeToAssignRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id is Missing" });
    }
    const employee = await Employee.findById(id).populate('role','role').populate('department','departmentName');
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res
      .status(200)
      .json({ message: "Employee Fetched Successfully", result: employee });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .josn({ message: "Cannot Fetch Employees, Internal Server Error" });
  }
};

//Function to assign role and department
export const assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, department, userName, email } = req.body;

    // Find the Role and Department by their names
    const updatedRole = await Role.findOne({ role });
    const updatedDepartment = await Department.findOne({ departmentName: department });

    // Check if Role and Department are valid
    if (!updatedRole || !updatedDepartment) {
      return res.status(400).json({
        message: "Invalid Role or Department",
      });
    }
    

    // Find the employee and old role
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const oldRoleId = employee.role;

    // Find the old role for logging purposes
    const oldRole = await Role.findById(oldRoleId);
    if (!oldRole) {
      return res.status(404).json({
        message: "Old Role not found",
      });
    }
    //Check whether the old and current role are same
    if(updatedRole.role===oldRole.role){
      return res.status(400).json({
        message: "Old Role and Current Role are Same",
      });
    }
    // Update the employee with new role and department
    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: userName,
          email: email,
          role: updatedRole._id,
          department: updatedDepartment._id,
        },
      },
      { new: true }
    );

    // Log role change
    const roleHistory = new RoleHistory({
      employee: updateEmployee._id,
      oldRole: oldRoleId,
      newRole: updatedRole._id,
    });
    await roleHistory.save();

    res.status(200).json({
      message: "Role and Department Assigned Successfully",
      result: updateEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot Assign Role or Department, Internal Server Error",
    });
  }
};

//Function to delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmp = await Employee.findByIdAndDelete(id);
    const deletePromotionDetail = await RoleHistory.deleteOne({employee:id})
    
    if (!deleteEmp) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Cannot Delete Employee, Internal Server Error" });
  }
};

//Function to update the employee profile
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Employee Updated Successfully",
        result: updatedEmployee,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Update Employee, Internal Server Error" });
  }
};
