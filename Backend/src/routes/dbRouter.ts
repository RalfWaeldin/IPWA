import { Router } from "express";
import { interviewSave } from "#controllers";

const dbRouter = Router();

dbRouter.post("/interview", interviewSave);

export default dbRouter;
