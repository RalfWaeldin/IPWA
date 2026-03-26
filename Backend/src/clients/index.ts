import { OpenAI } from "openai";
import { setDefaultOpenAIClient, setTracingDisabled } from "@openai/agents";
import { OPEN_ROUTER_API_KEY, ROUTER_TRACING_DISABLED } from "#config";

function getOpenRouterClientFromEnv(): OpenAI {
  if (OPEN_ROUTER_API_KEY) {
    // Using open Router
    console.log("Client as OpenRouter");
    const orclient = new OpenAI({
      apiKey: OPEN_ROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
    setDefaultOpenAIClient(orclient);
    setTracingDisabled(ROUTER_TRACING_DISABLED);
    return orclient;
  }
  throw new Error("No valid Open Router configuration found", {
    cause: { status: 404 },
  });
}

export const OpenRouterClient = getOpenRouterClientFromEnv();
