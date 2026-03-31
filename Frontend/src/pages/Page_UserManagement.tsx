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
    <main className="flex content-center items-center p-2 mx-auto sm:w-full flex-col w-full h-screen">
      <div className="h-fit w-10/12 bg-white">
        <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
          Register User
        </div>
        <div className="p-2 w-full">
          <form className="bg-gray-300 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 w-full p-2">
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
                  id="rolelabel"
                  htmlFor="role"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">Rolle:</span>
                </label>
                <select id="role" name="role" className="bg-white text-[12px]">
                  <option value="root">Root</option>
                  <option value="editor">Erfassung</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  id="vornamelabel"
                  htmlFor="firstName"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">Vorname:</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  className="bg-white text-[12px]"
                  placeholder="Vorname"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="nachnamelabel"
                  htmlFor="lastName"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">Nachname:</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  className="bg-white text-[12px]"
                  placeholder="Nachname"
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
                  type="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-white text-[12px] w-full"
                />
              </div>
              <div className="flex flex-col">
                <label
                  id="confirmpasswordlabel"
                  htmlFor="confirmPassword"
                  className="text-[12px] text-gray-100"
                >
                  Password wiederholen:
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  placeholder="Password wiederholen"
                  className="bg-white text-[12px] w-full"
                />
              </div>
              <div> </div>
              <div className="flex flex-col mt-5">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px]"
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
