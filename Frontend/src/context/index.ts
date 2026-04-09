import { use, createContext } from "react";
import AuthenticationProvider, {
  useAuthentication,
} from "./AuthenticationProvider";
import InterviewAgentProvider, {
  useInterviewAgentContext,
} from "./InterviewAgentProvider";
import InterviewDbProvider, {
  useInterviewDbContext,
} from "./InterviewDbProvider";
import RequestDbProvider, { useRequestDbContext } from "./RequestDbProvider";

// ========================================================
// Authentication
// ========================================================
const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null,
);

export { AuthenticationContext, useAuthentication, AuthenticationProvider };

// ========================================================
// Interview (Agent)
// ========================================================
const InterviewAgentContext = createContext<InterviewAgentContextType | null>(
  null,
);

export {
  InterviewAgentContext,
  useInterviewAgentContext,
  InterviewAgentProvider,
};

// ========================================================
// Interview (Db)
// ========================================================

const InterviewDbContext = createContext<InterviewDbContextType | null>(null);

export { InterviewDbContext, useInterviewDbContext, InterviewDbProvider };

// ========================================================
// Request (Db)
// ========================================================

const RequestDbContext = createContext<RequestDbContextType | null>(null);

export { RequestDbContext, RequestDbProvider, useRequestDbContext };
