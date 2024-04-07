import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
