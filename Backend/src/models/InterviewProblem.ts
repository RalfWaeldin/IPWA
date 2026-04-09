import { model, Schema } from "mongoose";
import { Interviews, Problems } from "#models";
import { optional } from "zod";

const interviewProblemSchema = new Schema(
  {
    InterviewObjectId: {
      type: String,
      references: Interviews,
    },
    ProblemObjectId: {
      type: String,
      references: Problems,
    },
  },
  {
    timestamps: true,
  },
);

export default model("InterviewProblems", interviewProblemSchema);
