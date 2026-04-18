import { use, useEffect, useState, type ReactNode } from "react";
import { RequestDbContext } from ".";
import {
  problemList,
  solutionList,
  interviewList,
  translateInterview,
} from "@/data";

const RequestDbProvider = ({ children }: { children: ReactNode }) => {
  const [problemColl, setProblemColl] = useState<Array<keyValuePair> | []>([]);
  const [solutionColl, setSolutionColl] = useState<Array<keyValuePair> | []>(
    [],
  );
  const [showInterviewDetails, setShowInterviewDetails] =
    useState<boolean>(false);
  const [displayData, setDisplayData] = useState<
    RequestAnswerListDataType | []
  >([]);

  const [chosenInterview, setChosenInterview] = useState<
    SingleInterviewDataType | {}
  >({});

  useEffect(() => {
    const solutionlisting = handleGetSolutionList({});
    solutionlisting.then((data) => {
      setSolutionColl(data.list);
    });

    const problemlisting = handleGetProblemList({});
    problemlisting.then((data) => {
      setProblemColl(data.list);
    });
  }, []);

  const getInterviewSelection = async ({
    problemids,
    solutionids,
  }: InterviewRequestCategories) => {
    const result: RequestAnswerListDataType = await interviewList(
      problemids,
      solutionids,
    );
    return result;
  };

  const handleGetSolutionList = async ({}) => {
    const result: RequestCategoryListDatatype = await solutionList();
    return result;
  };

  const handleGetProblemList = async ({}) => {
    const result: RequestCategoryListDatatype = await problemList();
    return result;
  };

  const getTranslatedInterview = async ({
    interviewid,
    language,
  }: TranslationRequestType) => {
    const result: SingleInterviewDataType = await translateInterview(
      interviewid,
      language,
    );
    return result;
  };
  const value: RequestDbContextType = {
    solutionColl,
    problemColl,
    showInterviewDetails,
    displayData,
    chosenInterview,
    setChosenInterview,
    setDisplayData,
    setShowInterviewDetails,
    handleGetSolutionList,
    handleGetProblemList,
    getInterviewSelection,
    getTranslatedInterview,
  };

  return <RequestDbContext value={value}>{children}</RequestDbContext>;
};

export default RequestDbProvider;

export const useRequestDbContext = (): RequestDbContextType => {
  const context = use(RequestDbContext);
  if (!context)
    throw new Error(
      "useRequestDbContext must be used within an RequestProvider",
    );
  return context;
};
