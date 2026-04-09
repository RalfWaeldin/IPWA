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

export { interviewInput, interviewStorage };
