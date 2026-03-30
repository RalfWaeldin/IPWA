import { model, Schema } from "mongoose";
import { optional } from "zod";

const userSchema = new Schema(
  {
    firstName: { type: String, optional },
    lastName: { type: String, optional },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: { type: String, required: [true, "A Role is required"] },
  },
  {
    timestamps: true,
  },
);

export default model("User", userSchema);
