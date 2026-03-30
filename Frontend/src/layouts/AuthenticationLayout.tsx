import { Outlet, Navigate } from "react-router";
import { use } from "react";
import { AuthenticationContext } from "@/context/AuthenticationContext";

const AuthenticationLayout = () => {
  const authContext = use(AuthenticationContext);

  const isAuthenticated = authContext?.locked ? false : true;

  console.log("AUTH", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticationLayout;
