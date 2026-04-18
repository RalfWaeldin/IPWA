import { Link } from "react-router";
import Locked from "./symbols/Locked";
import UnLocked from "./symbols/UnLocked";
import { useAuthentication } from "@/context";
import bulb from "@/assets/bulb.svg";
import chart from "@/assets/chart.png";
import team from "@/assets/team.png";
import Administration from "./symbols/Administration";
import Impressum from "./symbols/Impressum";

export default function MobileHamburgercontrols() {
  const { signedIn, user, handleSignOut } = useAuthentication();
  return (
    <div className="absolute top-7 -right-full zindex-50 menu menu-sm dropdown-content bg-base-100 rounded-sm z-1 w-50 right-1 shadow text-[10px]">
      <div className="flex flex-col p-2 w-full">
        <Link to="/fragen">
          <div className="flex flex-row h-6">
            <div className="mr-1">
              <img src={bulb} alt="" className="w-[10px]" />
            </div>
            <div className="  text-[#0099ff] text-xs ">Assistenten fragen</div>
          </div>
        </Link>
        <Link to="/suchen">
          <div className="flex flex-row h-6">
            <div className="mr-1">
              <img src={team} alt="" className="w-[12px]" />
            </div>
            <div className="text-[#0099ff] text-xs ">Archiv durchsuchen</div>
          </div>
        </Link>
        {signedIn ? (
          <Link to="/interview">
            <div className="flex flex-row h-6">
              <div className="mr-1">
                <img src={chart} alt="" className="w-[12px]" />
              </div>
              <div className="text-[#0099ff] text-xs ">Interview erfassen </div>
              <UnLocked width="14" height="14" color="#6699ff" />
            </div>
          </Link>
        ) : (
          <Link to="/interview">
            <div className="flex flex-row h-6">
              <div className="mr-1">
                <img src={chart} alt="" className="w-[12px]" />
              </div>
              <div className="text-gray-400 text-xs ">Interview erfassen </div>
              <UnLocked width="14" height="14" color="#6699ff" />
            </div>
          </Link>
        )}
        <Link to="/impressum">
          <div className="flex flex-row hover:bg-blue-300 text-blue-400 text-xs h-6">
            <div className="mr-1">
              <Impressum width="15" color="#33aadd" />
            </div>
            <div className="text-[#0099ff] text-xs">Impressum</div>
          </div>
        </Link>
        {signedIn ? (
          <div onClick={() => handleSignOut()}>
            <div className="flex flex-row border-t-1 border-t-blue-900 hover:bg-blue-300 text-blue-400 text-xs h-6">
              <div className="mr-1">
                <Locked width="14" height="14" color="#6699ff" />
              </div>
              <div className="text-[#0099ff] text-xs">Sign out</div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex flex-row border-t-1 border-t-blue-900 text-xs h-6">
              <div className="mr-1">
                <UnLocked width="14" height="14" color="#6699ff" />
              </div>
              <div className="text-[#0099ff] text-xs">Sign in</div>
            </div>
          </Link>
        )}
        {user && user.role === "root" ? (
          <Link to="/usermanagement">
            <div className="flex flex-row text-blue-400 text-xs h-6">
              <div className="mr-1">
                <Administration width="15" color1="#33aadd" />
              </div>
              <div className="text-[#0099ff] text-xs">Administration</div>
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
