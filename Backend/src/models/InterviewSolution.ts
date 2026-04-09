import { model, Schema } from "mongoose";
import { Interviews, Solutions } from "#models";

const interviewSolutionSchema = new Schema(
  {
    InterviewObjectId: {
      type: String,
      references: Interviews,
    },
    SolutionObjectId: {
      type: String,
      references: Solutions,
    },
  },
  {
    timestamps: true,
  },
);

export default model("InterviewSolutions", interviewSolutionSchema);
