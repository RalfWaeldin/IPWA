import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { ZodObject } from "zod";
import { z } from "zod/mini";
import { run } from "@openai/agents";
import {
  InterviewAgent,
  ClassifictionAgent,
  FrageTranslationAgent,
  FrageCategorizeAgent,
  CategoryTranslatorAgent,
  InterviewTranslatorAgent,
} from "#agents";
import { writeLogFileEntry } from "#utils";
import {
  Interviews,
  InterviewProblems,
  Problems,
  InterviewSolutions,
  Solutions,
} from "#models";

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

    const interviewinputtokens =
      result.state._modelResponses[0]?.usage.inputTokens;
    const interviewoutputtokens =
      result.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Interview Conversion - Input tokens: "${interviewinputtokens}, Output tokens: "${interviewoutputtokens}"`,
      res,
      3,
      "agentController/interviewInput",
    );

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

    const categorizeinputtokens =
      finalresult.state._modelResponses[0]?.usage.inputTokens;
    const categorizeoutputtokens =
      finalresult.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Interview Classification - Input tokens: "${categorizeinputtokens}, Output tokens: "${categorizeoutputtokens}"`,
      res,
      3,
      "agentController/interviewInput",
    );

    res.json(output);
  } catch (err) {
    console.log(err);
  }
  //next();
};

const category = z.object({
  key: z.string(),
  value: z.string(),
});

const frageCategoryInput = z.object({
  frage: z.string(),
  categories: z.array(category),
});

export const beantworteFrage: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter beantworteFrage",
    res,
    2,
    "agentController/beantworteFrage",
  );
  const { frage, problempairs } = req.body;
  writeLogFileEntry(
    `Frage: ${JSON.stringify(frage)}`,
    res,
    3,
    "agentController/beantworteFrage",
  );
  writeLogFileEntry(
    `Problem Pairs: ${JSON.stringify(problempairs)}`,
    res,
    3,
    "agentController/beantworteFrage",
  );

  try {
    const result = await run(FrageTranslationAgent, frage);

    const translationoutput = {
      originalFrage: result.finalOutput?.originalFrage,
      language: result.finalOutput?.language,
      germanFrage: result.finalOutput?.germanFrage[0],
    };

    writeLogFileEntry(
      `Translationresult: "${JSON.stringify(translationoutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const questiontranslationinputtokens =
      result.state._modelResponses[0]?.usage.inputTokens;
    const questiontranslationoutputtokens =
      result.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Question Translation - Input tokens: "${questiontranslationinputtokens}, Output tokens: "${questiontranslationoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categoryfrage = result.finalOutput?.germanFrage[0];
    const categoryinputobject = {
      frage: categoryfrage,
      problems: problempairs,
    };

    const categoryoutput = await run(
      FrageCategorizeAgent,
      JSON.stringify(categoryinputobject),
    );

    writeLogFileEntry(
      `Kategorien: "${JSON.stringify(categoryoutput.finalOutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categoryinputtokens =
      categoryoutput.state._modelResponses[0]?.usage.inputTokens;
    const categoryoutputtokens =
      categoryoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Kategorize - Input tokens: "${categoryinputtokens}, Output tokens: "${categoryoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categorytranslationinputobjects = {
      Language: translationoutput.language,
      Categories: categoryoutput.finalOutput?.categories,
    };

    const translatedcategoryoutput = await run(
      CategoryTranslatorAgent,
      JSON.stringify(categorytranslationinputobjects),
    );

    writeLogFileEntry(
      `Translated Kategorien: "${JSON.stringify(translatedcategoryoutput.finalOutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const translationinputtokens =
      translatedcategoryoutput.state._modelResponses[0]?.usage.inputTokens;
    const translationoutputtokens =
      translatedcategoryoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Category Translation - Input tokens: "${translationinputtokens}, Output tokens: "${translationoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const output = {
      Deutsch: {
        Frage: translationoutput.germanFrage,
        Categories: categoryoutput.finalOutput?.categories,
      },
      Fremdsprache:
        translationoutput.language != "Deutsch"
          ? {
              language: translationoutput.language,
              Frage: translationoutput.originalFrage,
              Categories:
                translatedcategoryoutput.finalOutput?.translatedcategories,
            }
          : {},
    };

    //languageinterviewlist;

    //

    res.json(output);
  } catch (err) {
    console.log(err);
  }
};

export const languageinterviewlist: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter languageinterviewlist",
    res,
    2,
    "agentController/languageinterviewlist",
  );
  const { problemids, language } = req.body;

  writeLogFileEntry(
    `Problem Ids: ${JSON.stringify(problemids)}`,
    res,
    3,
    "agentController/languageinterviewlist",
  );

  writeLogFileEntry(
    `Language: ${language}`,
    res,
    3,
    "agentController/languageinterviewlist",
  );

  const solutionids = null;

  try {
    const fetchpath = `http://127.0.0.1:3000/requests/interviews`;
    const interviewsresult = await fetch(fetchpath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ problemids, solutionids }),
    });

    if (!interviewsresult.ok)
      throw new Error(
        `${interviewsresult.status}. Get interview list for languageinterview went wrong!`,
      );

    const interwiewdatafromdb = await interviewsresult.json();
    writeLogFileEntry(
      `Interview Origin Data: ${JSON.stringify(interwiewdatafromdb)}`,
      res,
      3,
      "agentController/languageinterviewlist",
    );

    if (language == "Deutsch" || language == "German") {
      const deutschOutput = {
        language: "Deutsch",
        interviews: interwiewdatafromdb,
      };
      res.json(deutschOutput);
    } else {
      // translate interwiewdatafromdb with InterviewTranslatorAgent

      const interviewtranslationinputobjects = {
        Language: language,
        Interviews: interwiewdatafromdb,
      };

      const translatedinterviewoutput = await run(
        InterviewTranslatorAgent,
        JSON.stringify(interviewtranslationinputobjects),
      );

      writeLogFileEntry(
        `Translationresult: "${JSON.stringify(translatedinterviewoutput.finalOutput)}"`,
        res,
        3,
        "agentController/languageinterviewlist",
      );
      const inputtokens =
        translatedinterviewoutput.state._modelResponses[0]?.usage.inputTokens;
      const outputtokens =
        translatedinterviewoutput.state._modelResponses[0]?.usage.outputTokens;
      writeLogFileEntry(
        `Input tokens: "${inputtokens}, Output tokens: "${outputtokens}"`,
        res,
        3,
        "agentController/languageinterviewlist",
      );

      res.json(translatedinterviewoutput.finalOutput);
    }
  } catch (error) {}
};

export const translateinterview: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter languageinterviewlist",
    res,
    2,
    "agentController/translateinterview",
  );
  const { interviewid, language } = req.body;
  writeLogFileEntry(
    `Body interviewid: ${interviewid} language: ${language}`,
    res,
    3,
    "agentController/translateinterview",
  );

  const interviewdata = await Interviews.findById(interviewid);

  const interviewrecord = {
    interviewtext: { key: interviewid, value: interviewdata?.interview },
    cardtext: { key: interviewid, value: interviewdata?.problem },
    problems: [],
    solutions: [],
  };

  const problemdata = await InterviewProblems.find({
    InterviewObjectId: interviewid,
  });

  for await (const problemrecord of problemdata) {
    const problemOid = problemrecord.ProblemObjectId;
    const record = await Problems.findById(problemOid);

    const detailrecord = {
      key: problemrecord.ProblemObjectId,
      value: record?.problem,
    };
    interviewrecord.problems.push(detailrecord);
  }

  const solutiondata = await InterviewSolutions.find({
    InterviewObjectId: interviewid,
  });

  for await (const solutionrecord of solutiondata) {
    const solutionOid = solutionrecord.SolutionObjectId;
    const record = await Solutions.findById(solutionOid);

    const detailrecord = {
      key: solutionrecord.SolutionObjectId,
      value: record?.solutionIdentifier,
    };
    interviewrecord.solutions.push(detailrecord);
  }

  if (language == "Deutsch" || language == "German") {
    res.json(interviewrecord);
  } else {
    const interviewtranslationinputobjects = {
      Language: language,
      Interviews: [interviewrecord],
    };

    const translatedinterviewoutput = await run(
      InterviewTranslatorAgent,
      JSON.stringify(interviewtranslationinputobjects),
    );

    const tranlatedinterviewarray =
      translatedinterviewoutput.finalOutput.interviews;
    const translatedinterview = tranlatedinterviewarray[0];

    writeLogFileEntry(
      `Translationresult: "${JSON.stringify(translatedinterview)}"`,
      res,
      3,
      "agentController/languageinterviewlist",
    );
    const inputtokens =
      translatedinterviewoutput.state._modelResponses[0]?.usage.inputTokens;
    const outputtokens =
      translatedinterviewoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Input tokens: "${inputtokens}, Output tokens: "${outputtokens}"`,
      res,
      3,
      "agentController/languageinterviewlist",
    );

    res.json(translatedinterview);
  }
};
