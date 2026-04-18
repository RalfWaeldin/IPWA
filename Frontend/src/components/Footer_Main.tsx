import { Link } from "react-router";
import kittelfg from "@/assets/KittelTasche_FG.png";

export default function Footer_Main() {
  return (
    <>
      <div
        className="fixed bottom-0 flex flex-row w-full sm:w-[800px]"
        style={{ zIndex: 30 }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full">
            <img src={kittelfg} alt="" width="100%" />
          </div>
          <div className="flex flex-row w-full place-content-between px-5 py-1 text-xs text-cyan-700 bg-cyan-200">
            <div className="flex flex-row w-fit">&copy; RRW 2026</div>
            <div className="flex flex-row w-fit">
              <Link to="/impressum">Impressum</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
