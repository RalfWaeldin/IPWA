import { type ReactNode } from "react";
import { use, useState } from "react";
import { InterviewAgentContext } from ".";

import { interviewInput } from "@/data";

const InterviewAgentProvider = ({ children }: { children: ReactNode }) => {
  const [checkSession, setCheckSession] = useState(true);

  const handleInterviewErfassung = async ({ prompt }: InterviewData) => {
    const result = await interviewInput({ prompt });
    //setSignedIn(true);
    setCheckSession(true);
    return result;
  };

  const value: InterviewAgentContextType = {
    handleInterviewErfassung,
  };

  return (
    <InterviewAgentContext value={value}>{children}</InterviewAgentContext>
  );
};

export default InterviewAgentProvider;

export const useInterviewAgentContext = (): InterviewAgentContextType => {
  const context = use(InterviewAgentContext);
  if (!context)
    throw new Error(
      "useInterviewAgentContext must be used within an InterviewProvider",
    );
  return context;
};
