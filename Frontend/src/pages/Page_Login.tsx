import { useAuthentication } from "@/context";
import { useState, type SubmitEventHandler } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

type LoginFormState = {
  email: string;
  password: string;
};

const Page_Login = () => {
  const { signedIn, handleSignIn } = useAuthentication();
  const [{ email, password }, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);
      // console.log(email, password);
      // TODO: Add login logic

      await handleSignIn({ email, password });
      toast.success("Login attempted (not implemented)");
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (signedIn) return <Navigate to="/" />;

  return (
    <main className="flex content-center items-center p-2 mx-auto sm:w-full flex-col w-full h-screen">
      <div className="h-fit w-80 mt-12 bg-white">
        <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
          Login
        </div>
        <div className="p-2 w-full">
          <div className="text-[12px]">
            Einige Funktionen benötigen ausreichende Berechtigungen. Bitte
            loggen Sie sich ein.
          </div>
          <form className="bg-gray-300 mt-5 w-full" onSubmit={handleSubmit}>
            <div className="w-full max-w-xs p-2">
              <div className="flex flex-col">
                <label
                  id="emaillabel"
                  htmlFor="email"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">E-Mail:</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="bg-white text-[12px]"
                  placeholder="Ihr Email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="passwordlabel"
                  htmlFor="password"
                  className="text-[12px] text-gray-100"
                >
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="bg-white text-[12px] w-full"
                />
              </div>
              <div className="flex flex-col mt-5">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px]"
                  disabled={loading}
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page_Login;
/*

import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login, getMe } from "@/data/authentication.tsx";
import useAuthentication from "@/context/ALT_useAuthentication";

type LoginFormState = {
  email: string;
  password: string;
};

export default function Page_Login() {
  const navigate = useNavigate();
  const { setUser, setLocked } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const [{ email, password }, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  //const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);
      await login({ email, password });
      const { user } = await getMe();
      setUser({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      setLocked(true);
      navigate("/");
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      console.log("ERROR:", error);
      console.log("ERROR MESSAGE:", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex content-center items-center p-2 mx-auto sm:w-full flex-col w-full h-screen">
      <div className="h-fit w-80 mt-12 bg-white">
        <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
          Login
        </div>
        <div className="p-2 w-full">
          <div className="text-[12px]">
            Einige Funktionen benötigen ausreichende Berechtigungen. Bitte
            loggen Sie sich ein.
          </div>
          <form className="bg-gray-300 mt-5 w-full" onSubmit={handleSubmit}>
            <div className="w-full max-w-xs p-2">
              <div className="flex flex-col">
                <label
                  id="emaillabel"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">E-Mail:</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="bg-white text-[12px]"
                  placeholder="Ihr Email"
                />
              </div>
              <div className="flex flex-col">
                <label id="passwordlabel" className="text-[12px] text-gray-100">
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="bg-white text-[12px] w-full"
                />
              </div>
              <div className="flex flex-col mt-5">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px]"
                  disabled={loading}
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

*/
