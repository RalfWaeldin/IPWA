import { useAuthentication } from "@/context";
import { useState, type SubmitEventHandler } from "react";
import { toast } from "react-toastify";

type RegisterFormState = {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export default function Page_UserManagement() {
  const [loading, setLoading] = useState(false);
  const { handleRegister } = useAuthentication();
  const [
    { email, role, firstName, lastName, password, confirmPassword },
    setForm,
  ] = useState<RegisterFormState>({
    email: "",
    role: "editor",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (!email || !firstName || !lastName || !password || !confirmPassword)
        throw new Error("All fields are required");
      setLoading(true);
      // console.log(email, password);
      // TODO: Add login logic

      await handleRegister({
        email,
        role,
        firstName,
        lastName,
        password,
        confirmPassword,
      });
      toast.success("Login attempted (not implemented)");
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      console.log("Register ERROR:", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main
      id="administration_main"
      className="flex flex-col items-center w-full sm:w-[800px] mt-8 sm:mt-40 sm:mb-170 overflow-hidden z-2"
    >
      {" "}
      <div className="h-fit w-10/12 bg-cyan-200  rounded-2xl mb-5">
        <div className="h-7 pl-2 pt-1 bg-cyan-700 text-white text-[12px]  rounded-t-2xl">
          Register User
        </div>
        <div className="p-2 w-full">
          <form
            className="bg-cyan-50 rounded-b-xl w-full"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 w-full p-2">
              <div className="flex flex-col">
                <label
                  id="emaillabel"
                  htmlFor="email"
                  className="label text-[12px] text-cyan-700 mb-1"
                >
                  <span className="label-text">E-Mail:</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="bg-white text-[12px] border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                  placeholder="Ihr Email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="rolelabel"
                  htmlFor="role"
                  className="label text-[12px] text-cyan-700 mb-1"
                >
                  <span className="label-text">Rolle:</span>
                </label>
                <select
                  id="role"
                  name="role"
                  className="bg-white text-[12px] border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                >
                  <option value="root">Root</option>
                  <option value="editor">Erfassung</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  id="vornamelabel"
                  htmlFor="firstName"
                  className="label text-[12px] text-cyan-700 mb-1"
                >
                  <span className="label-text">Vorname:</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  className="bg-white text-[12px] border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                  placeholder="Vorname"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="nachnamelabel"
                  htmlFor="lastName"
                  className="label text-[12px] text-cyan-700 mb-1"
                >
                  <span className="label-text">Nachname:</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  className="bg-white text-[12px] border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                  placeholder="Nachname"
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
                  type="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-white text-[12px] w-full border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="confirmpasswordlabel"
                  htmlFor="confirmPassword"
                  className="text-[12px] text-cyan-700 mb-1"
                >
                  Password wiederholen:
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  placeholder="Password wiederholen"
                  className="bg-white text-[12px] w-full border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1"
                />
              </div>
              <div> </div>
              <div className="flex flex-col mt-1">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px] border-cyan-700 bg-cyan-200 shadow-2xs"
                  disabled={loading}
                >
                  Erzeugen
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
