import { use } from "react";
import { Link } from "react-router";
import UserIcon from "./symbols/User";
import { useAuthentication } from "@/context";
export default function NavigationUserStatus() {
  //const authContext = use(AuthenticationContext);
  const { signedIn, user, handleSignIn, handleSignOut } = useAuthentication();
  return (
    <>
      {signedIn ? (
        <div className="dropdown">
          <div
            tabindex="0"
            id="userMessage"
            className="flex flex-row hover:bg-[#99eeff] pb-1 px-1"
          >
            <div className="flex place-content-center mr-1">
              <UserIcon
                width="20"
                height="20"
                innersize="30"
                colors={{ border: "#0099ff", icon: "#00ddff" }}
              />
            </div>
            <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
              {user?.firstName}
              <br />
              {user?.lastName}
            </div>
          </div>

          <div
            tabindex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-1 w-50 right-1 shadow text-[10px]"
          >
            <div onClick={() => handleSignOut()}>
              <div className="flex flex-row border-t-1 border-t-blue-900 hover:bg-blue-300 text-blue-400 text-xs h-6">
                Sign out
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dropdown">
          <div
            tabindex="0"
            id="userMessage"
            className="flex flex-row hover:bg-[#ddddff] pb-1 px-1"
          >
            <div className="flex place-content-center mr-1">
              <UserIcon
                width="20"
                height="20"
                innersize="30"
                colors={{ border: "#aaaaff", icon: "#aaaaff" }}
              />
            </div>
            <div className="text-[8px] text-[#aaaaff] text-left leading-[10px]">
              No
              <br />
              Login
            </div>
          </div>
          <div
            tabindex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-1 w-50 right-1 shadow text-[10px]"
          >
            <Link to="/login">
              <div className="flex flex-row text-gray-400 text-xs h-6">
                Sign in
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
