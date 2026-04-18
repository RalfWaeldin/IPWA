import { Router } from "express";
import {
  solutionList,
  problemList,
  interviewList,
  beantworteFrage,
  languageinterviewlist,
  translateinterview,
} from "#controllers";

const requestRouter = Router();

requestRouter.get("/solutions", solutionList);
requestRouter.get("/problems", problemList);
requestRouter.post("/interviews", interviewList);
requestRouter.post("/fragen", beantworteFrage);
requestRouter.post("/languageinterview", languageinterviewlist);
requestRouter.post("/translateinterview", translateinterview);

export default requestRouter;
