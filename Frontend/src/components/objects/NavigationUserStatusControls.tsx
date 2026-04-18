import { Link } from "react-router";
import { useAuthentication } from "@/context";

export default function NavigationUserStatusControls() {
  const { signedIn, handleSignOut } = useAuthentication();
  return (
    <div className="absolute top-9 right-0 zindex-50 menu menu-sm dropdown-content bg-base-100 rounded-sm w-50 shadow text-[10px]">
      <div className="flex flex-col p-2 w-full">
        {signedIn ? (
          <div onClick={() => handleSignOut()}>
            <div className="flex flex-row hover:bg-blue-300 text-blue-400 text-xs h-6">
              Sign out
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex flex-row hover:bg-blue-300 text-blue-400 text-xs h-6">
              Sign in
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
