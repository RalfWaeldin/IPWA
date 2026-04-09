import { Router } from "express";
import { interviewInput } from "#controllers";

const agentRouter = Router();

agentRouter.post("/interview", interviewInput);

export default agentRouter;
