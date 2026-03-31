import { Outlet, Navigate } from "react-router";
import { use } from "react";
import { useAuthentication } from "@/context";

const AuthenticationLayout = () => {
  const { signedIn } = useAuthentication();

  return signedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticationLayout;
