import { model, Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    interview: {
      type: String,
      required: [true, "Interview Text is required"],
    },
    problem: {
      type: String,
      required: [true, "Problem Description is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default model("Interviews", interviewSchema);
