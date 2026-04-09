import { use, useEffect, useState, type ReactNode } from "react";
import { RequestDbContext } from ".";
import { problemList, solutionList } from "@/data";

const RequestDbProvider = ({ children }: { children: ReactNode }) => {
  const [problemColl, setProblemColl] = useState<Array<keyValuePair> | []>([]);
  const [solutionColl, setSolutionColl] = useState<Array<keyValuePair> | []>(
    [],
  );
  useEffect(() => {
    console.log("RequestDbProvider UseEffect");

    const solutionlisting = handleGetSolutionList({});
    solutionlisting.then((data) => {
      console.log("solutionlisting List:", data.list as Array<keyValuePair>);
      setSolutionColl(data.list);
    });

    const problemlisting = handleGetProblemList({});
    problemlisting.then((data) => {
      console.log("problemlisting List:", data.list as Array<keyValuePair>);
      setProblemColl(data.list);
    });
  }, []);

  const handleGetSolutionList = async ({}) => {
    const result: RequestCategoryListDatatype = await solutionList();
    return result;
  };

  const handleGetProblemList = async ({}) => {
    const result: RequestCategoryListDatatype = await problemList();
    return result;
  };

  const value: RequestDbContextType = {
    solutionColl,
    problemColl,
    handleGetSolutionList,
    handleGetProblemList,
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
