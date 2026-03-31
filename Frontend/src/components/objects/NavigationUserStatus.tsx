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
          <div tabindex="0" role="button" className="btn btn-ghost btn-circle">
            <div id="userMessage" className="flex flex-col">
              <div className="flex place-content-center">
                <UserIcon
                  width="20"
                  height="20"
                  innersize="30"
                  colors={{ border: "#0000ff", icon: "#0000ff" }}
                />
              </div>
              <div className="text-[8px] text-[#0000ff]">
                {user?.firstName} {user?.lastName}
              </div>
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
          <div tabindex="0" role="button" className="btn btn-ghost btn-circle">
            <div id="userMessage" className="flex flex-col">
              <div className="flex place-content-center">
                <UserIcon
                  width="20"
                  height="20"
                  innersize="30"
                  colors={{ border: "#aaaaff", icon: "#aaaaff" }}
                />
              </div>
              <div className="text-[8px] text-[#aaaaff]">No Login</div>
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
