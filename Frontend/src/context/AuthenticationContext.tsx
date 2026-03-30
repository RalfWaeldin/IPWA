import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface AuthenticationContextType {
  locked: boolean;
  setLocked: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authLoading: boolean;
}

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);
