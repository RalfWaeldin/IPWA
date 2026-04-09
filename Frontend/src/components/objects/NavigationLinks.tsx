import { Link } from "react-router";
import { useAuthentication } from "@/context";
import Locked from "./symbols/Locked";
import UnLocked from "./symbols/UnLocked";
import bulb from "@/assets/bulb.svg";
import chart from "@/assets/chart.png";
import team from "@/assets/team.png";
import Administration from "./symbols/Administration";

export default function NavigationLinks() {
  const { signedIn, user } = useAuthentication();

  return (
    <>
      <Link to="/fragen">
        <div className="flex flex-row hover:bg-cyan-300 p-1">
          <div>
            <img
              src={bulb}
              alt="Archiv durchsuchen"
              className="w-[12px] mr-1"
            />
          </div>
          <div className="text-[10px]  font-mono font-bold text-cyan-600">
            Fragen
          </div>
        </div>
      </Link>{" "}
      <Link to="/suchen">
        <div className="flex flex-row hover:bg-cyan-300 p-1">
          <div>
            <img
              src={team}
              alt="Archiv durchsuchen"
              className="w-[18px] mr-1"
            />
          </div>
          <div className="text-[10px] font-mono font-bold text-cyan-600">
            Archiv
          </div>
        </div>
      </Link>
      {signedIn ? (
        <Link to="/interview">
          <div className="flex flex-row hover:bg-cyan-300 p-1">
            <div>
              <img
                src={chart}
                alt="Archiv durchsuchen"
                className="w-[18px] mr-1"
              />
            </div>
            <div className="text-[10px] font-mono font-bold text-cyan-600 mr-1">
              Interview
            </div>
            <UnLocked width="12" height="12" color="#6699ff" />
          </div>
        </Link>
      ) : (
        <Link to="/interview">
          <div className="flex flex-row hover:bg-gray-300 p-1">
            <div>
              <img
                src={chart}
                alt="Archiv durchsuchen"
                className="w-[18px] mr-1"
              />
            </div>
            <div className="text-[10px] font-mono font-bold text-gray-400 mr-1">
              Interview
            </div>
            <Locked width="12" height="12" color="#999999" />
          </div>
        </Link>
      )}
      {user && user.role === "root" ? (
        <Link to="/usermanagement">
          <div className="flex flex-row hover:bg-cyan-300 p-1">
            <div className="mr-1">
              <Administration width="17" color1="#33aadd" />
            </div>
            <div className="text-[10px] font-mono font-bold text-cyan-600">
              Administration
            </div>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
