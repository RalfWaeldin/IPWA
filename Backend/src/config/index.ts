import { z } from "zod/v4";

const envSchema = z.object({
  MONGO_URI: z.url({ protocol: /mongodb/ }),
  PORT: z.string().default("3000"),
  DB_NAME: z.string().default("ipwa"),
  //OPENAI_API_KEY: z.string().default(""),
  OPEN_ROUTER_API_KEY: z.string().default(""),
  ROUTER_TRACING_DISABLED: z.coerce.boolean().default(true),
  INTERVIEW_MAINMODEL: z.string().default("google/gemini-3-flash-preview"),
  CLASSIFICATION_MAINMODEL: z.string().default("google/gemini-3-flash-preview"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log(
    "Invalid environment variables:\n",
    z.prettifyError(parsedEnv.error),
  );
  process.exit(1);
}

export const {
  MONGO_URI,
  DB_NAME,
  PORT,
  //OPENAI_API_KEY,
  OPEN_ROUTER_API_KEY,
  ROUTER_TRACING_DISABLED,
  INTERVIEW_MAINMODEL,
  CLASSIFICATION_MAINMODEL,
} = parsedEnv.data;
