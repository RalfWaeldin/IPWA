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

export { solutionList, problemList };
