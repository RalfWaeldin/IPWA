import { authenticationServiceURL } from "@/utils";

type LoginInput = { email: string; password: string };

type SuccessRes = { message: string };

const login = async (formData: LoginInput): Promise<SuccessRes> => {
  const res = await fetch(`${authenticationServiceURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as SuccessRes;
  // console.log(data);

  return data;
};

const me = async (): Promise<User> => {
  const res = await fetch(`${authenticationServiceURL}/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const { user } = (await res.json()) as SuccessRes & { user: User };
  // console.log(data);

  return user;
};

const logout = async (): Promise<SuccessRes> => {
  const res = await fetch(`${authenticationServiceURL}/auth/logout`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as SuccessRes;
  // console.log(data);

  return data;
};

const register = async (formData: RegisterFormState): Promise<SuccessRes> => {
  const res = await fetch(`${authenticationServiceURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as SuccessRes;

  return data;
};

export { login, me, logout, register };

/*

const API_URL: string | undefined = import.meta.env.VITE_IPWA_API_URL as
  | string
  | undefined;

type SuccessRes = { message: string };

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL: string = `${API_URL}/auth`;

export async function login(body: { email: string; password: string }) {
  const { email, password } = body;

  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!res.ok)
    throw new Error(
      `Login failed: status(${res.status}) reason(${res.statusText}) type(${res.type}) `,
    );

  console.log("LOGIN Request passed");
  const data = (await res.json()) as SuccessRes;
  return data;
}

export async function getMe() {
  const userRes = await fetch(`${baseURL}/me`, { credentials: "include" });
  if (!userRes.ok) throw new Error("Get Me failed");

  return userRes.json();
}

export async function logout() {
  const res = await fetch(`${baseURL}/logout`, { method: "DELETE" });
  if (!res.ok) throw new Error("Logout failed");
  const data = (await res.json()) as SuccessRes;
  return data;
}

*/
