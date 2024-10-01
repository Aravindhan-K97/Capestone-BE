import Department from "../Models/departmentSchema.js";
import dotenv from "dotenv";

dotenv.config();

//Function to create a new department
export const createDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;
    const newDepartment = new Department({
      departmentName,
      description,
    });
    await newDepartment.save();
    res.status(200).json({ message: "Department Created Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed To Create Department, Internal Server Error" });
  }
};

//Function to fetch all the departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      message: "Departments fetched successfully",
      result: departments,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Cannot Fetch Departments, Internal Server Error" });
  }
};

//Function to get a single department by id
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "Id is Missing" });
    }
    const department = await Department.findById(id);
    if (!department) {
      return res.status(401).json({ message: "Department Not Found" });
    }
    res
      .status(200)
      .json({ message: "Department Fetched Successfully", result: department });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Cannot Fetch Department, Internal Server Error" });
  }
};

//Function to update department details
export const editDepartment = async (req, res) => {
  try {
    const editedDepartment = await Department.findByIdAndUpdate(req.params.id, {
      $set: {
        departmentName: req.body.departmentName,
        description: req.body.description,
      },
    });
    res
      .status(200)
      .json({
        message: "Department Updated Successfully",
        result: editedDepartment,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Update Department, Internal Server Error" });
  }
};

//Function to delete department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findByIdAndDelete(id);
    if (!deleteDep) {
      return res.status(404).json({ message: "Department Not Found" });
    }
    res.status(200).json({ message: "Department Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Delete Department, Internal Server Error" });
  }
};
