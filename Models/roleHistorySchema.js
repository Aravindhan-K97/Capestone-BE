import mongoose from "mongoose";

const roleHistorySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    oldRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    newRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    dateOfChange: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const RoleHistory = mongoose.model("RoleHistory", roleHistorySchema);

export default RoleHistory;
