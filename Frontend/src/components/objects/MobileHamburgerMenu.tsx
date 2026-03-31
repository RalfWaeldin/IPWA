import { use } from "react";
import { Link } from "react-router";
import Hamburger from "./symbols/Hamburger";
import Locked from "./symbols/Locked";
import UnLocked from "./symbols/UnLocked";
import { useAuthentication } from "@/context";

export default function MobileHamburgerMenu() {
  const { signedIn, user, handleSignOut } = useAuthentication();
  return (
    <div className="dropdown">
      <div tabindex="0" role="button" className="btn btn-ghost btn-circle">
        <Hamburger width="24" height="24" color1="#9999ff" />
      </div>
      <div
        tabindex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-1 w-50 right-1 shadow text-[10px]"
      >
        <div className="flex flex-col p-2 w-full">
          <Link to="/">
            <div className="hover:bg-blue-300 text-blue-400 text-xs h-6">
              Lösung suchen
            </div>
          </Link>
          {signedIn ? (
            <Link to="/interview">
              <div className="flex flex-row hover:bg-blue-300 text-blue-400 text-xs h-6">
                Interview erfassen{" "}
                <UnLocked width="14" height="14" color="#6699ff" />
              </div>
            </Link>
          ) : (
            <Link to="/interview">
              <div className="flex flex-row text-gray-400 text-xs h-6">
                Interview erfassen{" "}
                <Locked width="14" height="14" color="#999999" />
              </div>
            </Link>
          )}
          <Link to="/impressum">
            <div className="hover:bg-blue-300 text-blue-400 text-xs h-6">
              Impressum
            </div>
          </Link>
          {signedIn ? (
            <div onClick={() => handleSignOut()}>
              <div className="flex flex-row border-t-1 border-t-blue-900 hover:bg-blue-300 text-blue-400 text-xs h-6">
                Sign out
              </div>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex flex-row border-t-1 border-t-blue-900 hover:bg-blue-300 text-blue-400 text-xs h-6">
                Sign in
              </div>
            </Link>
          )}
          {user && user.role === "root" ? (
            <Link to="/usermanagement">
              <div className="flex flex-row hover:bg-blue-300 text-blue-400 text-xs h-6">
                Benutzermanagement
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
