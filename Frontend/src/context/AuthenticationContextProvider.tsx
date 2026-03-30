import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { getMe } from "../data";

const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<null | User>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    initialLogin();
    async function initialLogin() {
      try {
        setAuthLoading(true);
        const {
          user: { email, firstName, lastName, role },
        } = await getMe();
        setUser({ email, firstName, lastName, role });
      } catch (error) {
        console.log(error);
      } finally {
        setAuthLoading(false);
      }
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ locked: true, setLocked: () => {}, user, setUser, authLoading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
