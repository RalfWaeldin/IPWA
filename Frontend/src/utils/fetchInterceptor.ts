const originalFetch = window.fetch;
const authenticationServiceURL = import.meta.env.VITE_IPWA_API_URL;
const interviewServiceURL = import.meta.env.VITE_IPWA_API_URL;
const requestServiceURL = import.meta.env.VITE_IPWA_API_URL;

if (!authenticationServiceURL) {
  console.error("No authentication service set");
}

window.fetch = async (url, options, ...rest) => {
  let res = await originalFetch(
    url,
    { ...options, credentials: "include" },
    ...rest,
  );
  const authHeader = res.headers.get("www-authenticate");
  if (authHeader?.includes("token_expired")) {
    console.log("ATTEMPT REFRESH");
    const refreshRes = await originalFetch(
      `${authenticationServiceURL}/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (!refreshRes.ok) throw new Error("Login required");
    res = await originalFetch(
      url,
      { ...options, credentials: "include" },
      ...rest,
    );
  }
  return res;
};

export { authenticationServiceURL, interviewServiceURL, requestServiceURL };
