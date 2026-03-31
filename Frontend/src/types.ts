import type { Dispatch, SetStateAction } from "react";
declare global {
  type User = {
    _id: string;
    createdAt: string;
    __v: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };

  type LoginData = { email: string; password: string };

  type RegisterFormState = {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  };

  type AuthenticationContextType = {
    signedIn: boolean;
    user: User | null;
    handleSignIn: ({ email, password }: LoginData) => Promise<void>;
    handleSignOut: () => Promise<void>;
    handleRegister: (formState: RegisterFormState) => Promise<void>;
  };
}
