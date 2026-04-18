import type { RequestHandler } from "express";
import mongoose from "mongoose";
import {
  Interviews,
  Problems,
  InterviewProblems,
  Solutions,
  InterviewSolutions,
  SolutionPhrases,
} from "#models";

import { writeLogFileEntry } from "#utils";
import type { ClientSession } from "mongoose";
import { record, string } from "zod";
import type { ErrorObject } from "openai/resources";
import { SystemError } from "@openai/agents";

type SolutionPhrases = [string] | [];

type InterviewAnswerType = {
  interviewtext: keyValuePair;
  cardtext: keyValuePair;
  problems: keyValuePair[];
  solutions: keyValuePair[];
};

type InterviewAnswerListType = [InterviewAnswerType];

type SolutionElement = {
  solutionIdentifier: string;
  solutionPhrases: SolutionPhrases;
};

type SolutionList = [SolutionElement];

type AcceptedInterviewData = {
  acceptedData: {
    finaltext: string;
    problem: string;
    problemCategories: [string] | [];
    solutions: SolutionList;
  };
};

type AcceptedData = {
  finaltext: string;
  problem: string;
  problemCategories: [string] | [];
  solutions: SolutionList;
};

type interviewRecordData = {
  interview: string;
  problem: string;
};

type keyValuePair = {
  key: string;
  value: string;
};

// ===================================================================
// Interview Save
// ===================================================================

const insertInterviewRecord = async function (
  interview: string,
  problem: string,
  session: ClientSession,
) {
  const [newInterview] = await Interviews.create(
    [{ interview: interview, problem: problem }],
    { session },
  );

  if (!newInterview)
    throw new Error("Error inserting Interview", {
      cause: { status: 404 },
    });

  const interviewObjectId = newInterview._id.toString();
  return interviewObjectId;
};

const insertNewProblemCategories = async function (
  problemCategoryArray: [string],
  session: ClientSession,
) {
  const problemIds = [];
  for await (const category of problemCategoryArray) {
    console.log(`Process category: ${category}`);
    const existingProblemRecord = await Problems.exists({ category });

    if (!existingProblemRecord) {
      const [newProblemRecord] = await Problems.create(
        [{ problem: category }],
        {
          session,
        },
      );

      if (!newProblemRecord)
        throw new Error("Error inserting Problem category", {
          cause: { status: 404 },
        });
      const newProblemObjectId = newProblemRecord._id.toString();
      problemIds.push(newProblemObjectId);
    } else {
      const existingProblemObjectId = existingProblemRecord._id.toString();
      problemIds.push(existingProblemObjectId);
    }
  }
  return problemIds as [string];
};

const insertNewInterviewProblemCategories = async function (
  interviewObjectId: string,
  problemObjectIds: [string] | [],
  session: ClientSession,
) {
  for await (const problemObjectId of problemObjectIds) {
    const [newInterviewProblem] = await InterviewProblems.create(
      [
        {
          InterviewObjectId: interviewObjectId,
          ProblemObjectId: problemObjectId,
        },
      ],
      { session },
    );
    if (!newInterviewProblem)
      throw new Error("Error inserting Interview to Problem relation", {
        cause: { status: 404 },
      });
  }
};

const insertNewSolution = async function (
  solutionIdentifier: string,
  session: ClientSession,
) {
  console.log(`solutionIdentifier: "${solutionIdentifier}"`);

  const existingSolutionRecord = await Solutions.exists({ solutionIdentifier });
  if (!existingSolutionRecord) {
    const [newSolutionRecord] = await Solutions.create(
      [{ solutionIdentifier }],
      { session },
    );

    if (!newSolutionRecord)
      throw new Error("Error inserting Solution", {
        cause: { status: 404 },
      });

    console.log(`New Solution: "${solutionIdentifier}" created`);
    return newSolutionRecord._id;
  } else {
    console.log(`Solution: "${solutionIdentifier}" already available`);
    return existingSolutionRecord._id;
  }
};

const insertNewInterviewSolution = async function (
  interviewObjectId: string,
  solutionObjectId: string,
  session: ClientSession,
) {
  const newInterviewSolution = await InterviewSolutions.create(
    [
      {
        InterviewObjectId: interviewObjectId,
        SolutionObjectId: solutionObjectId,
      },
    ],
    { session },
  );
  if (!newInterviewSolution)
    throw new Error("Error inserting Interview to Solution relation", {
      cause: { status: 404 },
    });
};

const insertSolutionPhrase = async function (
  solutionObjectId: string,
  phrase: string,
  session: ClientSession,
) {
  const [newSolutionPhrase] = await SolutionPhrases.create(
    [
      {
        SolutionObjectId: solutionObjectId,
        Phrase: phrase,
      },
    ],
    { session },
  );
  if (!newSolutionPhrase)
    throw new Error("Error inserting Solution phrase", {
      cause: { status: 404 },
    });
};

export const interviewSave: RequestHandler = async (req, res, next) => {
  writeLogFileEntry(
    "Enter interview Save",
    res,
    2,
    "dbController/interviewSave",
  );
  const { acceptedData } = req.body;
  const acceptedDataContent = acceptedData.acceptedData;

  writeLogFileEntry(
    `Interview Save Body: ${JSON.stringify(acceptedDataContent)}`,
    res,
    3,
    "dbController: interviewSave",
  );
  // =========================================================
  // Start Transaction
  // =========================================================
  writeLogFileEntry(
    `Start Transaction - Interview Insertion`,
    res,
    2,
    "dbController: interviewSave",
  );
  const session = await Interviews.startSession();
  await session.startTransaction();

  try {
    // ---------------------------------------------
    // insert finaltext, problem into Interviews
    // ---------------------------------------------

    const interviewObjectId = await insertInterviewRecord(
      acceptedDataContent.finaltext,
      acceptedDataContent.problem,
      session,
    );

    writeLogFileEntry(
      `Interview data with id: "${interviewObjectId}" inserted`,
      res,
      3,
      "dbController: interviewSave",
    );

    // ----------------------------------------------
    // insert new problem categories
    // ----------------------------------------------
    const inputProblemCategories = acceptedDataContent.problemCategories;

    const problemObjectIds = await insertNewProblemCategories(
      inputProblemCategories,
      session,
    );

    writeLogFileEntry(
      `${problemObjectIds.length} Problem categories inserted"`,
      res,
      3,
      "dbController: interviewSave",
    );
    // ----------------------------------------------
    // insert new interview to problem categories
    // ----------------------------------------------
    await insertNewInterviewProblemCategories(
      interviewObjectId,
      problemObjectIds,
      session,
    );

    writeLogFileEntry(
      `Interview to Problem relations inserted"`,
      res,
      3,
      "dbController: interviewSave",
    );

    console.log(`Before Solution Loop`);

    // for each solutionIdentifier in solutions
    const solutions: SolutionList = acceptedDataContent.solutions;
    const solutionObjectIds = [];
    for await (const solution of solutions) {
      const { solutionIdentifier, solutionPhrases } = solution;
      console.log(`Enter Solution Loop: "${JSON.stringify(solution)}"`);
      // ----------------------------------------------
      // insert new solution
      // ----------------------------------------------
      const solutionObjectId = await insertNewSolution(
        solutionIdentifier,
        session,
      );

      writeLogFileEntry(
        `Solution "${solutionIdentifier} synchronized"`,
        res,
        3,
        "dbController: interviewSave",
      );

      solutionObjectIds.push(solutionObjectId);

      console.log(`solutionObjectIds: "${JSON.stringify(solutionObjectIds)}"`);

      // ----------------------------
      // insert InterviewSolution
      // ----------------------------
      await insertNewInterviewSolution(
        interviewObjectId,
        solutionObjectId.toString(),
        session,
      );

      writeLogFileEntry(
        `Interview to Solution relations inserted"`,
        res,
        3,
        "dbController: interviewSave",
      );

      console.log(
        `solutionPhrases for Loop: "${JSON.stringify(solutionPhrases)}"`,
      );

      // for each phrase in solutionPhrases
      for await (const solutionPhrase of solutionPhrases) {
        console.log(
          `Handle solutionPhrase: "${JSON.stringify(solutionPhrase)}"`,
        );
        // ----------------------------
        // insert SolutionPhrase
        // ----------------------------
        await insertSolutionPhrase(
          solutionObjectId.toString(),
          solutionPhrase,
          session,
        );
      }

      writeLogFileEntry(
        `${solutionPhrases.length} Solution Phrases for solution "${solutionIdentifier}" inserted"`,
        res,
        3,
        "dbController: interviewSave",
      );
    }
    // =========================================================
    // commit Transaction
    // =========================================================
    await session.commitTransaction();
    writeLogFileEntry(
      `Transaction commited: Intervie insterted into db`,
      res,
      2,
      "dbController: interviewSave",
    );
    res.json({ message: "Inteview inserted" });
  } catch (error) {
    // =========================================================
    // Rollback Transaction
    // =========================================================
    await session.abortTransaction();
    writeLogFileEntry(
      `Transaction aborted - Interview Insertion: Rollback`,
      res,
      2,
      "dbController: interviewSave",
    );
    throw Error(
      `Interview Insertion as transaction failed: ${(error as Error).message}`,
    );
  } finally {
    await session.endSession();
  }
  //next();
};

// ===================================================================

export const solutionList: RequestHandler = async (req, res) => {
  writeLogFileEntry("Enter solutionList", res, 2, "dbController/solutionList");

  try {
    const solutions = await Solutions.find({});

    if (!solutions)
      throw new Error("Solutions not found", { cause: { status: 404 } });

    writeLogFileEntry(
      `Solution List found!`,
      res,
      3,
      "dbController/solutionList",
    );

    const solutionarray = Array.from(
      solutions,
      (item) =>
        new Object({
          key: item._id,
          value: item.solutionIdentifier,
        }),
    );

    writeLogFileEntry(
      `output array: ${JSON.stringify(solutionarray)}`,
      res,
      3,
      "dbController/solutionList",
    );

    const output = {
      list: solutionarray,
    };

    res.json(output);
  } catch (error) {}
};

export const problemList: RequestHandler = async (req, res) => {
  writeLogFileEntry("Enter problemList", res, 2, "dbController/problemList");
  try {
    const problems = await Problems.find({});

    if (!problems)
      throw new Error("Problems not found", { cause: { status: 404 } });

    writeLogFileEntry(
      `Solution List found!`,
      res,
      3,
      "dbController/solutionList",
    );

    const problemarray = Array.from(
      problems,
      (item) =>
        new Object({
          key: item._id,
          value: item.problem,
        }),
    );

    writeLogFileEntry(
      `output array: ${JSON.stringify(problemarray)}`,
      res,
      3,
      "dbController/solutionList",
    );

    const output = {
      list: problemarray,
    };

    res.json(output);
  } catch (error) {}
};

// ===================================================================
// Interview Search
// ===================================================================

const interviewRelationsByProblemId = async (problemObjectId: string) => {
  const problemrelations = await InterviewProblems.find({
    ProblemObjectId: problemObjectId,
  });

  return problemrelations;
};

const interviewRelationsBySolutionId = async (solutionObjectId: string) => {
  const solutionrelations = await InterviewSolutions.find({
    SolutionObjectId: solutionObjectId,
  });

  return solutionrelations;
};

const interviewRelationsByInterviewId = async (
  interviewObjectId: string,
  relationType: string,
) => {
  console.log("interviewObjectId", interviewObjectId);
  if (relationType == "problemRelation") {
    console.log("Get Problem Relation", relationType);
    const problemrelations = await InterviewProblems.find({
      InterviewObjectId: interviewObjectId,
    });

    return problemrelations;
  } else {
    console.log("Get Solution Relation", relationType);
    const solutionrelations = await InterviewSolutions.find({
      InterviewObjectId: interviewObjectId,
    });

    return solutionrelations;
  }
};

const interviewByInterviewId = async (interviewId: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(interviewId);
    const interview = await Interviews.findOne({
      _id: objectId,
    });

    return interview;
  } catch (error) {
    return null;
  }
};

const getInterviewOutput = async (interviewIdentifier: string) => {
  const foundInterview = await interviewByInterviewId(interviewIdentifier);

  if (foundInterview) {
    const interviewfulltext = {
      key: interviewIdentifier,
      value: foundInterview.interview,
    };

    const interviewshorttext = {
      key: interviewIdentifier,
      value: foundInterview.problem,
    };

    // get assigned problems
    const assignedProblems = await interviewRelationsByInterviewId(
      interviewIdentifier,
      "problemRelation",
    );

    const problemsArray = [];

    for await (const assignedProblem of assignedProblems) {
      const assignedProblemId = assignedProblem.ProblemObjectId;
      const assignedProblemObjectId = new mongoose.Types.ObjectId(
        assignedProblemId,
      );

      const problemRecord = await Problems.findOne({
        _id: assignedProblemObjectId,
      });
      console.log("problemRecord:", problemRecord);

      const problemOutputItem = {
        key: assignedProblemId,
        value: problemRecord?.problem,
      };
      console.log("problemOutputItem:", problemOutputItem);
      problemsArray.push(problemOutputItem);
    }

    // get assigned solutions

    const assignedSolutions = await interviewRelationsByInterviewId(
      interviewIdentifier,
      "solutionRelation",
    );

    const solutionsArray = [];

    for await (const assignedSolution of assignedSolutions) {
      const assignedSolutionId = assignedSolution.SolutionObjectId;
      const assignedSolutionObjectId = new mongoose.Types.ObjectId(
        assignedSolutionId,
      );

      const solutionRecord = await Solutions.findOne({
        _id: assignedSolutionObjectId,
      });

      console.log("solutionRecord:", solutionRecord);

      const solutionOutputItem = {
        key: assignedSolutionId,
        value: solutionRecord?.solutionIdentifier,
      };
      console.log("solutionOutputItem:", solutionOutputItem);
      solutionsArray.push(solutionOutputItem);
    }

    const interviewresult: InterviewAnswerType = {
      interviewtext: interviewfulltext,
      cardtext: interviewshorttext,
      problems: problemsArray,
      solutions: solutionsArray,
    };

    return interviewresult;
  }
};

// ===================================================================

export const interviewList: RequestHandler = async (req, res) => {
  writeLogFileEntry("Enter problemList", res, 2, "dbController/interviewList");
  const { problemids, solutionids } = req.body;

  try {
    const interviewList: InterviewAnswerListType | [] = [];

    if (problemids && problemids.length > 0) {
      writeLogFileEntry(
        `Problem Ids: ${problemids}`,
        res,
        3,
        "dbController/interviewList",
      );
      for await (const problemId of problemids) {
        const interviewRelations =
          await interviewRelationsByProblemId(problemId);

        for await (const interviewRelation of interviewRelations) {
          const interviewIdentifier = interviewRelation.InterviewObjectId;
          writeLogFileEntry(
            `problem relation interviewId: ${problemId} - ${interviewIdentifier} `,
            res,
            3,
            "dbController/interviewList",
          );

          if (interviewIdentifier) {
            if (
              !interviewList.find(
                (entry) => entry.interviewtext.key == interviewIdentifier,
              )
            ) {
              const interviewresult =
                await getInterviewOutput(interviewIdentifier);

              if (interviewresult) {
                interviewList.push(interviewresult);
              }
            }
          }
        }
      }
    } else {
      writeLogFileEntry(
        `No problem ids `,
        res,
        3,
        "dbController/interviewList",
      );
    }

    if (solutionids && solutionids.length > 0) {
      writeLogFileEntry(
        `Solution Ids: ${solutionids}`,
        res,
        3,
        "dbController/interviewList",
      );
      for await (const solutionId of solutionids) {
        const interviewRelations =
          await interviewRelationsBySolutionId(solutionId);

        for await (const interviewRelation of interviewRelations) {
          const interviewIdentifier = interviewRelation.InterviewObjectId;
          writeLogFileEntry(
            `solution relation interviewId: ${solutionId} - ${interviewIdentifier} `,
            res,
            3,
            "dbController/interviewList",
          );
          if (interviewIdentifier) {
            if (
              !interviewList.find(
                (entry) => entry.interviewtext.key == interviewIdentifier,
              )
            ) {
              const interviewresult =
                await getInterviewOutput(interviewIdentifier);

              if (interviewresult) {
                writeLogFileEntry(
                  `push interviewresult: ${interviewresult} `,
                  res,
                  3,
                  "dbController/interviewList",
                );
                interviewList.push(interviewresult);
              }
            }
          }
        }
      }
    } else {
      writeLogFileEntry(
        `No solution ids `,
        res,
        3,
        "dbController/interviewList",
      );
    }
    writeLogFileEntry(
      `output interview list: ${JSON.stringify(interviewList)} `,
      res,
      3,
      "dbController/interviewList",
    );

    res.json(interviewList);
  } catch (error) {}
};

// ===================================================================
