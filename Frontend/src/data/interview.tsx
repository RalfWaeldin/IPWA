import { interviewServiceURL } from "@/utils";

type InterviewInput = { prompt: string };

type SuccessRes = { message: string };

const interviewInput = async (
  formData: InterviewInput,
): Promise<InterviewAnalysisDate> => {
  const fetchpath = `${interviewServiceURL}/agents/interview`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as InterviewAnalysisDate;

  return data;
};

const interviewStorage = async (
  acceptedData: AcceptedInterviewData,
): Promise<SuccessRes> => {
  const fetchpath = `${interviewServiceURL}/db/interview`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(acceptedData),
  });
  if (!res.ok)
    throw new Error(
      `${res.status}. Something went wrong with storing interview!`,
    );

  const data = (await res.json()) as SuccessRes;

  return data;
};

const customerAnswer = async (
  //frage: string,
  //problempairs: keyValuePair[],
  prompt: string,
): Promise<CustomerAnswerDataType> => {
  //const params = JSON.parse(prompt);
  console.log(`customerAnswer: ${JSON.stringify(prompt)}`);
  //console.log(`customerAnswer: ${JSON.stringify(params)}`);
  const fetchpath = `${interviewServiceURL}/requests/fragen`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: prompt, //JSON.stringify({ frage, problempairs }),
  });

  if (!res.ok)
    throw new Error(
      `${res.status}. Something went wrong with answering question!`,
    );

  const data = (await res.json()) as CustomerAnswerDataType;

  return data;
};

const languageInterviewSets = async (
  prompt: string,
): Promise<InterviewsDataType> => {
  console.log(`languageInterviewSets: ${JSON.stringify(prompt)}`);
  const fetchpath = `${interviewServiceURL}/requests/languageinterview`;
  const res = await fetch(fetchpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: prompt, //JSON.stringify({ frage, problempairs }),
  });

  if (!res.ok)
    throw new Error(
      `${res.status}. Something went wrong with answering question!`,
    );

  const data = (await res.json()) as InterviewsDataType;

  return data;
};

export {
  interviewInput,
  interviewStorage,
  customerAnswer,
  languageInterviewSets,
};
