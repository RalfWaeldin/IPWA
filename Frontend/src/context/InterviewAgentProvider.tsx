import { useEffect, type ReactNode } from "react";
import { use, useState } from "react";
import { InterviewAgentContext } from ".";

import { interviewInput, customerAnswer, languageInterviewSets } from "@/data";

const InterviewAgentProvider = ({ children }: { children: ReactNode }) => {
  const [checkSession, setCheckSession] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInterviewErfassung = async ({ prompt }: InterviewData) => {
    const result = await interviewInput({ prompt });
    //setSignedIn(true);
    setCheckSession(true);
    return result;
  };

  const handleCustomerFrage = async ({ frage, problempairs }: FrageData) => {
    const frageprompt = { frage, problempairs };
    const result = await customerAnswer(JSON.stringify(frageprompt));
    setCheckSession(true);
    return result;
  };

  const handleGetInterviewSets = async ({
    language,
    problemids,
  }: InterviewAnswer) => {
    const frageprompt = { language, problemids };
    const result = await languageInterviewSets(JSON.stringify(frageprompt));
    setCheckSession(true);
    return result;
  };

  const value: InterviewAgentContextType = {
    handleInterviewErfassung,
    handleCustomerFrage,
    handleGetInterviewSets,
    thinking,
    setThinking,
    isPlaying,
    setIsPlaying,
  };

  useEffect(() => {
    if (thinking) {
      console.log("InterviewAgentProvider is thinking");
    } else {
      console.log("InterviewAgentProvider is not thinking");
    }
  }, [thinking]);

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
