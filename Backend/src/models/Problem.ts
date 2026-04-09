import { model, Schema } from "mongoose";

const problemSchema = new Schema(
  {
    problem: {
      type: String,
      required: [true, "Problem Category is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default model("Problems", problemSchema);
