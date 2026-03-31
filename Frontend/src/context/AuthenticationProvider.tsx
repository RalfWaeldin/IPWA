import { type ReactNode } from "react";
import { useState, useEffect } from "react";
import { AuthenticationContext } from ".";

import { login, me, logout, register } from "@/data";

const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkSession, setCheckSession] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setSignedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckSession(false);
      }
    };

    if (checkSession) getUser();
  }, [checkSession]);

  const handleSignIn = async ({ email, password }: LoginData) => {
    await login({ email, password });
    setSignedIn(true);
    setCheckSession(true);
  };

  const handleRegister = async (formState: RegisterFormState) => {
    await register(formState);
    setSignedIn(true);
    setCheckSession(true);
  };

  const handleSignOut = async () => {
    await logout();
    setSignedIn(false);
    setUser(null);
  };

  const value: AuthenticationContextType = {
    signedIn,
    user,
    handleSignIn,
    handleSignOut,
    handleRegister,
  };

  return (
    <AuthenticationContext value={value}>{children}</AuthenticationContext>
  );
};

export default AuthenticationProvider;
