import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      unique: true,
    },
    responsibilities: String,
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", rolesSchema);

export default Role;
