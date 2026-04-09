import type { RequestHandler } from "express";
import { ZodObject } from "zod";
import { run } from "@openai/agents";
import { InterviewAgent, ClassifictionAgent } from "#agents";
import { writeLogFileEntry } from "#utils";

export const interviewInput: RequestHandler = async (req, res, next) => {
  writeLogFileEntry(
    "Enter interview Input",
    res,
    2,
    "agentController/interviewInput",
  );
  const { prompt } = req.body;

  try {
    const result = await run(InterviewAgent, prompt);

    writeLogFileEntry(
      `Interview anonymized: "${result.finalOutput}"`,
      res,
      2,
      "agentController/interviewInput",
    );

    console.log("INTERVIEWRESULT", result.finalOutput);
    const interviewoutput = JSON.stringify(result.finalOutput);

    const finalresult = await run(ClassifictionAgent, interviewoutput);

    //res.json({ data: JSON.stringify(finalresult.finalOutput) });
    const output = {
      finaltext: finalresult.finalOutput?.finalText,
      problem: finalresult.finalOutput?.problem.analysisText,
      problemCategories: finalresult.finalOutput?.problem.umrellaTerms,
      solutions: finalresult.finalOutput?.solutionAnalysis,
    };
    writeLogFileEntry(
      `Interview Output ${JSON.stringify(output)}`,
      res,
      2,
      "agentController/interviewInput",
    );
    res.json(output);
  } catch (err) {
    console.log(err);
  }
  //next();
};
