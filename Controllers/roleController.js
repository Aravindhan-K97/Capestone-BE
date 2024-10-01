import Role from "../Models/rolesSchema.js";
import dotenv from "dotenv";

dotenv.config();

//Function to create a new role
export const createRole = async (req, res) => {
  try {
    const { role, responsibilities } = req.body;
    const newRole = new Role({
      role,
      responsibilities,
    });
    await newRole.save();
    res
      .status(200)
      .json({ message: "Role Created Successfully", result: newRole });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Create Role, Internal Server Error" });
  }
};

//Function to fetch all the roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res
      .status(200)
      .json({ message: "Roles Fetched Successfully", result: roles });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ message: "Failed to Fetch Roles, Internal Server Error" });
  }
};

//Function to fetch a department by id
export const getRoleById = async(req,res)=>{
    try {
       const {id} = req.params 
       if (!id) {
        return res.status(404).json({ message: "Id is Missing" });
      }
       const role = await Role.findById(id)
       if(!role){
        return res.status(404).json({message:"Role Not Found"})
       }
       res.status(200).json({message:"Role Fetched Successfully",result:role})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to Fetch Role, Internal Server Error"})
    }
}

//Function tp update the details of a role
export const updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, {
      $set: {
        role: req.body.role,
        responsibilities: req.body.responsibilities,
      },
    });
    res
      .status(200)
      .json({ message: "Role Updated Successfully", result: updatedRole });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Update Role, Internal Server Error" });
  }
};

//Function to delete a role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role Not Found" });
    }
    res.status(200).json({ message: "Role Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to Delete Role, Internal Server Error" });
  }
};
