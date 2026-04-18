import { requestServiceURL } from "@/utils";

const solutionList = async (): Promise<RequestCategoryListDatatype> => {
  const fetchpath = `${requestServiceURL}/requests/solutions`;
  const res = await fetch(fetchpath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error(`${res.status}. Get Solution List went wrong!`);

  const data = (await res.json()) as RequestCategoryListDatatype;

  return data;
};

const problemList = async (): Promise<RequestCategoryListDatatype> => {
  const fetchpath = `${requestServiceURL}/requests/problems`;
  const res = await fetch(fetchpath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status}. Get Problem List went wrong!`);

  const data = (await res.json()) as RequestCategoryListDatatype;

  return data;
};

const interviewList = async (
  problemids: AcceptedProblemSelectionType,
  solutionids: AcceptedSolutionSelectionType,
): Promise<RequestAnswerListDataType> => {
  const fetchpath = `${requestServiceURL}/requests/interviews`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ problemids, solutionids }),
  });
  if (!res.ok) throw new Error(`${res.status}. Get Problem List went wrong!`);

  const data = (await res.json()) as RequestAnswerListDataType;

  return data;
};

const translateInterview = async (
  interviewid: string,
  language: string,
): Promise<SingleInterviewDataType> => {
  const fetchpath = `${requestServiceURL}/requests/translateinterview`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ interviewid, language }),
  });
  if (!res.ok) throw new Error(`${res.status}. Get Problem List went wrong!`);

  const data = (await res.json()) as SingleInterviewDataType;

  return data;
};

export { solutionList, problemList, interviewList, translateInterview };
