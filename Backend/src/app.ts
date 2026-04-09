import cors from "cors";
import type { ErrorRequestHandler } from "express";
import express from "express";
import { type Request } from "express";
import { PORT } from "#config";
import {
  agentRoutes,
  authenticationRoutes,
  dbRoutes,
  requestRoutes,
} from "#routes";
import { ErrorHandler } from "#utils";
import "#db";
import cookieParser from "cookie-parser";
import { CLIENT_BASE_URL } from "#config";
import { OpenRouterClient } from "#clients";

const app = express();

app.use(
  cors({
    origin: CLIENT_BASE_URL,
    credentials: true,
    exposedHeaders: ["WWW-Authenticate"],
  }),
);
app.use(express.json(), cookieParser());

app.use(((err, _req, res, _next) => {
  res.status(err.cause?.status || 500).json({ message: err.message });
}) satisfies ErrorRequestHandler);

app.use("/agents", agentRoutes);
app.use("/auth", authenticationRoutes);
app.use("/requests", requestRoutes);
app.use("/db", dbRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "IPWA Backend is running" });
});

app.use("/{*splat}", (req: Request, res) => {
  throw Error(`${req.method}: Route ${req.baseUrl} not defined`, {
    cause: { status: 404 },
  });
});

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`AI Proxy listening on port ${PORT}`));
