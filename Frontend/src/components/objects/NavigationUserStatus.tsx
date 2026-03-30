import { use } from "react";
import UserIcon from "./symbols/User";
import { AuthenticationContext } from "../../context/AuthenticationContext";
export default function NavigationUserStatus() {
  const authContext = use(AuthenticationContext);
  return (
    <>
      {authContext?.locked ? (
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
      ) : (
        <div id="userMessage" className="flex flex-col">
          <div className="flex place-content-center">
            <UserIcon
              width="20"
              height="20"
              innersize="30"
              colors={{ border: "#0000ff", icon: "#0000ff" }}
            />
          </div>
          <div className="text-[8px] text-[#0000ff]">Logged in</div>
        </div>
      )}
    </>
  );
}
