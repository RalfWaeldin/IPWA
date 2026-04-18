import { useState } from "react";
import { Link } from "react-router";
import UserIcon from "./symbols/User";
import { useAuthentication } from "@/context";
import NavigationUserStatusControls from "./NavigationUserStatusControls";

type UserStatusProperties = {
  display?: string;
};

export default function NavigationUserStatus(props: UserStatusProperties) {
  const showAsModal: boolean = props.display ? true : false;
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const modal = isModal;
    setIsModal(!modal);
  };

  const { signedIn, user, handleSignIn, handleSignOut } = useAuthentication();
  return (
    <>
      {showAsModal ? (
        <>
          {isModal ? (
            <>
              <div
                id="User_Status_Modal"
                onClick={handleModal}
                className="absolute top-0 left-0 bg-[#9999cc99] w-full h-screen zindex-49"
              >
                <NavigationUserStatusControls />
              </div>
              <button onClick={handleModal}>
                <div
                  id="userMessage"
                  className="flex flex-row hover:bg-[#99eeff] pb-1 px-1 mr-2"
                >
                  <div className="flex place-content-center mr-1">
                    <UserIcon
                      width="20"
                      height="20"
                      innersize="30"
                      colors={{ border: "#0099ff", icon: "#00ddff" }}
                    />
                  </div>
                  {signedIn ? (
                    <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                      {user?.firstName}
                      <br />
                      {user?.lastName}
                    </div>
                  ) : (
                    <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                      no
                      <br />
                      login
                    </div>
                  )}
                </div>
              </button>
            </>
          ) : (
            <button onClick={handleModal}>
              <div
                id="userMessage"
                className="flex flex-row hover:bg-[#99eeff] pb-1 px-1 mr-2"
              >
                <div className="flex place-content-center mr-1">
                  <UserIcon
                    width="20"
                    height="20"
                    innersize="30"
                    colors={{ border: "#0099ff", icon: "#00ddff" }}
                  />
                </div>
                {signedIn ? (
                  <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                    {user?.firstName}
                    <br />
                    {user?.lastName}
                  </div>
                ) : (
                  <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                    no
                    <br />
                    login
                  </div>
                )}
              </div>
            </button>
          )}
        </>
      ) : (
        <>
          <div
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
            {signedIn ? (
              <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                {user?.firstName}
                <br />
                {user?.lastName}
              </div>
            ) : (
              <div className="text-[8px] text-cyan-500 text-left leading-[10px]">
                no
                <br />
                login
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
