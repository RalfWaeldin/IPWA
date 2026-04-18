import { useAuthentication } from "@/context";
import { useState, type SubmitEventHandler } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { InfoBox } from "@/components/objects/Infobox";

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
    <main
      id="login_main"
      className="flex flex-col items-center w-full sm:w-[800px] mt-45 sm:mt-70 sm:mb-140 overflow-hidden z-2"
    >
      <InfoBox
        infotext="Einige Funktionen benötigen ausreichende Berechtigungen. Bitte loggen
          Sie sich ein."
      />

      <div
        id="login_form_container"
        className="flex flex-col h-fit w-[65%] sm:w-[65%] sm:ml-10 bg-cyan-200 rounded-2xl ml-4"
      >
        <div className="h-7 w-full pl-2 pt-1 bg-cyan-700 rounded-t-2xl text-white text-[12px]">
          Login
        </div>
        <div className="flex w-full px-2 pb-2">
          <form
            className="flex flex-col bg-cyan-50 mt-2 w-full rounded-b-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full p-2">
              <div className="flex w-full flex-col">
                <label
                  id="emaillabel"
                  htmlFor="email"
                  className="label text-[12px] text-cyan-700  mb-1"
                >
                  <span className="label-text">E-Mail:</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="bg-white w-full text-[12px] border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1 mb-2"
                  placeholder="Ihr Email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="passwordlabel"
                  htmlFor="password"
                  className="text-[12px] text-cyan-700 mb-1"
                >
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="bg-white text-[12px] w-full border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1 "
                />
              </div>
              <div className="flex flex-col mt-5">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px] border-cyan-700 bg-cyan-200"
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
