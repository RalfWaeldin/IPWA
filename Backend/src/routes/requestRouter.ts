import { Router } from "express";
import { solutionList, problemList } from "#controllers";

const requestRouter = Router();

requestRouter.get("/solutions", solutionList);
requestRouter.get("/problems", problemList);

export default requestRouter;
