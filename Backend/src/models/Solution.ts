import { model, Schema } from "mongoose";

const solutionSchema = new Schema(
  {
    solutionIdentifier: {
      type: String,
      required: [true, "Solution Identifier is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default model("Solutions", solutionSchema);
