import { Link } from "react-router";
import { useAuthentication } from "@/context";
import Locked from "./symbols/Locked";
import UnLocked from "./symbols/UnLocked";

export default function NavigationLinks() {
  const { signedIn, user } = useAuthentication();

  return (
    <>
      <Link to="/">
        <div className="btn btn-ghost btn-sm hover:bg-blue-300 hover:border-blue-400 text-blue-400 text-xs h-8 w-40">
          Lösung suchen
        </div>
      </Link>
      {signedIn ? (
        <Link to="/interview">
          <div className="btn btn-ghost  hover:bg-blue-300 hover:border-blue-400 text-blue-400 text-xs h-8 w-40">
            <span>Interview erfassen</span>
            <UnLocked width="16" height="16" color="#6699ff" />
          </div>
        </Link>
      ) : (
        <Link to="/interview">
          <div className="btn btn-ghost btn-sm text-gray-400 text-xs h-8 w-40">
            Interview erfassen
            <Locked width="16" height="16" color="#999999" />
          </div>
        </Link>
      )}
      {user && user.role === "root" ? (
        <Link to="/usermanagement">
          <div className="btn btn-ghost btn-sm text-gray-400 text-xs h-8 w-40">
            Benutzermanagement
          </div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
