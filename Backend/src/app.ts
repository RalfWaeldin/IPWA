import cors from "cors";
import type { ErrorRequestHandler } from "express";
import express from "express";
import { PORT } from "#config";
import { agentRoutes } from "#routes";
import { OpenRouterClient } from "#clients";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/agents", agentRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "IPWA Backend is running" });
});

app.use("/{*splat}", () => {
  throw Error("Page not found", { cause: { status: 404 } });
});

app.use(((err, _req, res, _next) => {
  res.status(err.cause?.status || 500).json({ message: err.message });
}) satisfies ErrorRequestHandler);

app.listen(PORT, () => console.log(`AI Proxy listening on port ${PORT}`));
