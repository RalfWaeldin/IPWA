import { z } from "zod";
import { Agent } from "@openai/agents";
import { INTERVIEW_MAINMODEL, CLASSIFICATION_MAINMODEL } from "#config";

//===============================================================
// Interview Agent
//===============================================================
// Output definitions
const replacementschema = z.object({
  replacement: z.string(),
  original: z.string(),
  reason: z.string(),
});

const interviewOutput = z.object({
  transformed: z.string(),
  reasons: z.array(replacementschema),
});

// Interview Agent constructor
function getInterviewAgent() {
  return new Agent({
    name: "Interview Handler",
    model: INTERVIEW_MAINMODEL,
    outputType: interviewOutput,
    instructions: `You provide assistance with interview text by anonymize personal information in it 
    and output the transformed text as "transformed" key in the final output. 
    The reason for any replacement should be added as array "reasons" having for each replacement the "replacement" text, the "original" text and the "reason" for the replacement.  The key "reasons" key is added to the output.`,
  });
}

//===============================================================
// Classification Agent
//===============================================================
// Output definitions
const solutionschema = z.object({
  solutionIdentifier: z.string(),
  solutionPhrases: z.array(z.string()),
});

const problemAnalysis = z.object({
  analysisText: z.string(),
  umrellaTerms: z.array(z.string()),
});

const classificationOutput = z.object({
  finalText: z.string(),
  problem: problemAnalysis,
  solutionAnalysis: z.array(solutionschema),
});

// Classification Agent constructor
function getClassificationAgent() {
  return new Agent({
    name: "Klassification Handler",
    model: CLASSIFICATION_MAINMODEL,
    outputType: classificationOutput,
    instructions: `You provide assistance with finalize the provided "transformed" text. 
    Therefora all placeholders defined in the "reasons" "replacements" are going to be replaced with words like "Pflegefachkraft", "Bewohner" or "Institution" including required possessive pronouns and articles. 
    The updated text is going to be saved  as "finalText" in the output.
    Additionally try to identify the problem that is described with the text and save it as "problemAnalysis" in the output.
    The text is also providing one ore more soltionas for the problem. Insert for each solution a record into the "solutionAnalysis" having the text that is identified as the solution saved in "solutionPhrases" 
    and a suggestion of an Umbrella term saved in "solutionIdendifier".`,
  });
}

// Agent exports
export const InterviewAgent = getInterviewAgent();
export const ClassifictionAgent = getClassificationAgent();
