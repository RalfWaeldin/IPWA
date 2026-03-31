import { createContext, use } from "react";
import AuthenticationProvider from "./AuthenticationProvider";

const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null,
);

const useAuthentication = (): AuthenticationContextType => {
  const context = use(AuthenticationContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthenticationContext, useAuthentication, AuthenticationProvider };
