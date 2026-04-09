import { model, Schema } from "mongoose";
import { Solutions } from "#models";

const solutionPhraseSchema = new Schema(
  {
    SolutionObjectId: {
      type: String,
      references: Solutions,
    },
    Phrase: {
      type: String,
      required: [true, "Solution Phrase is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default model("SolutionPhrases", solutionPhraseSchema);
