import { Router } from "express";
import { interviewInput } from "#controllers";

const agentRouter = Router();

agentRouter.post("/", interviewInput);

export default agentRouter;
