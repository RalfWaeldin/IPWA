import { Outlet } from "react-router";
import kittelbg from "@/assets/KittelTasche_BG.png";

export default function Kittel_BG() {
  return (
    <>
      <div className="fixed top-7 sm:top-9 flex flex-col w-full sm:w-[800px] top-0 h-80 sm:h-50 z-1">
        <img src={kittelbg} alt="Hintergrund" className="flex w-full" />
      </div>
    </>
  );
}
