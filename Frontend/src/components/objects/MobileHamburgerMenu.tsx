import { useState } from "react";
import Hamburger from "./symbols/Hamburger";
import MobileHamburgercontrols from "./MobileHamburgerControls";

export default function MobileHamburgerMenu() {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = (e: React.MouseEventHandler<HTMLDivElement>) => {
    const modal = isModal;
    setIsModal(!modal);
    console.log(isModal);
  };

  return (
    <>
      {isModal ? (
        <>
          <div
            id="Hamburger_Modal"
            onClick={handleModal}
            className="absolute top-0 left-0 bg-[#9999cc99] w-screen h-screen zindex-49"
          >
            <MobileHamburgercontrols />
          </div>
          <button onClick={handleModal} className="mr-2">
            <Hamburger width="24" height="24" color1="#00ddff" />
          </button>
        </>
      ) : (
        <button onClick={handleModal} className="mr-2">
          <Hamburger width="24" height="24" color1="#00ddff" />
        </button>
      )}
    </>
  );
}
