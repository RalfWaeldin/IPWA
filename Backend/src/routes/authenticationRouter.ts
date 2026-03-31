import { Router } from "express";
import { login, logout, me, register } from "#controllers";
import { loginSchema, registerSchema } from "#schemas";
import { validateBody } from "#middleware";

const authenticationRouter = Router();

authenticationRouter.post("/register", validateBody(registerSchema), register);
authenticationRouter.get("/me", me);
authenticationRouter.post("/login", validateBody(loginSchema), login);
authenticationRouter.delete("/logout", logout);

export default authenticationRouter;
