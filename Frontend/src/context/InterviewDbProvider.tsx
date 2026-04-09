import { type ReactNode } from "react";
import { use, useState } from "react";
import { InterviewDbContext } from ".";

import { interviewStorage } from "@/data";

const InterviewDbProvider = ({ children }: { children: ReactNode }) => {
  const [checkSession, setCheckSession] = useState(true);

  const handleAcceptedInterview = async ({
    acceptedData,
  }: AcceptedInterviewData) => {
    const result = await interviewStorage({ acceptedData });
    setCheckSession(true);
  };

  const value: InterviewDbContextType = {
    handleAcceptedInterview,
  };

  return <InterviewDbContext value={value}>{children}</InterviewDbContext>;
};

export default InterviewDbProvider;

export const useInterviewDbContext = (): InterviewDbContextType => {
  const context = use(InterviewDbContext);
  if (!context)
    throw new Error(
      "useInterviewDbContext must be used within an InterviewProvider",
    );
  return context;
};
