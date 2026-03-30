const API_URL: string | undefined = import.meta.env.VITE_IPWA_API_URL as
  | string
  | undefined;

console.log("API URL:", API_URL);

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL: string = `${API_URL}/auth`;

console.log("BASE URL:", baseURL);

export async function login(body: { email: string; password: string }) {
  const { email, password } = body;

  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "omit",
  });
  if (!res.ok)
    throw new Error(
      `Login failed: status(${res.status}) reason(${res.statusText}) type(${res.type}) `,
    );

  console.log("LOGIN Request passed");
  const data = await res.json();
  return data;
}

export async function getMe() {
  const userRes = await fetch(`${baseURL}/me`, { credentials: "omit" });
  if (!userRes.ok) throw new Error("Get Me failed");
  return userRes.json();
}

export async function logout() {
  const res = await fetch(`${baseURL}/logout`, { method: "DELETE" });
  if (!res.ok) throw new Error("Logout failed");
}
