import type { RequestHandler } from "express";
import { ZodObject } from "zod";
import { run } from "@openai/agents";
import { InterviewAgent, ClassifictionAgent } from "#agents";

export const interviewInput: RequestHandler = async (req, res, next) => {
  const { prompt } = req.body;

  try {
    const result = await run(InterviewAgent, prompt);

    console.log("INTERVIEWRESULT", result.finalOutput);
    const interviewoutput = JSON.stringify(result.finalOutput);

    const finalresult = await run(ClassifictionAgent, interviewoutput);

    console.log("FINALRESULT", finalresult.finalOutput);
    //res.json({ data: JSON.stringify(finalresult.finalOutput) });
    res.json({
      finaltext: finalresult.finalOutput?.finalText,
      problem: finalresult.finalOutput?.problem.analysisText,
      problemCategories: JSON.stringify(
        finalresult.finalOutput?.problem.umrellaTerms,
      ),
      solutions: JSON.stringify(finalresult.finalOutput?.solutionAnalysis),
    });
  } catch (err) {
    console.log(err);
  }
  next();
};
