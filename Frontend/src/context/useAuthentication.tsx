import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export default function useAuthentication() {
  const auth = useContext(AuthenticationContext);
  if (!auth) throw new Error("AuthContext is not available");
  return auth;
}
