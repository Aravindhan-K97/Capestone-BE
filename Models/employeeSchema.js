import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
    token: String,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
