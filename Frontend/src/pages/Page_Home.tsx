import bg from "@/assets/bg.svg";
import hero from "@/assets/hero.png";
import bulb from "@/assets/bulb.svg";
import chart from "@/assets/chart.png";
import team from "@/assets/team.png";
import pflegefachkraft from "@/assets/pflegefachkraft.png";
import { Link } from "react-router";

export default function Page_Home() {
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <div
        style={{ position: "absolute", zIndex: 0 }}
        className="h-full overflow-hidden"
      >
        <img src={bg} alt="Hintergrund" className="w-[800px]" />
      </div>
      <div style={{ zIndex: 1 }} className="h-screen">
        <div id="hero" className="relative inline-block ml-[14px] ">
          <img
            src={hero}
            alt="hero"
            className="w-[100%] mask-l-from-60% mask-l-to-90% rounded-2xl"
          />
          <div className="absolute inset-0 flex flex-col">
            <div className="absolute font-bold text-sm text-cyan-700 pl-5 sm:pl-30 pt-2 sm:pt-10">
              Kitteltaschen-Mentor
            </div>
            <div className="text-2sm sm:text-2xl font-bold pl-5 sm:pl-30 pt-7 sm:pt-20 leading-[16px] sm:leading-[30px]">
              Deine Pflegelösungen –<br /> immer griffbereit.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-50%">
          <div id="schalter" className="w-2xs sm:w-xs text-2xl">
            <Link to="/fragen">
              <div
                id="card1"
                className="flex flex-row items-center bg-cyan-50 shadow-lg hover:shadow-xs mt-7 sm:mt-4 hover:mt-8 sm:hover:mt-5 mb-4 hover:mb-1 rounded-2xl  py-2"
              >
                <div className="flex flex-col mr-4 w-[50px] items-center">
                  <img src={bulb} alt="bulb" className="w-[30px]" />
                </div>
                <div className="text-[12px]">
                  <div className="font-bold">Frag das System:</div>
                  <div>
                    Problem beschreiben, <br />
                    KI findet Lösungen.
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/suchen">
              <div
                id="card2"
                className="flex flex-row items-center bg-cyan-50 shadow-lg hover:shadow-xs  mt-3 hover:mt-5 mb-4 hover:mb-1 rounded-2xl py-2"
              >
                <div className="flex flex-col mr-4 w-[50px] items-center">
                  <img src={team} alt="bulb" className="w-[30px]" />
                </div>
                <div className="text-[12px]">
                  <div className="font-bold">Profitiere von Erfahrung:</div>
                  <div>
                    Bewährte Strategien
                    <br />
                    von Kollegen nutzen.
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/interview">
              <div
                id="card3"
                className="flex flex-row items-center bg-cyan-50 shadow-lg hover:shadow-xs mt-3 hover:mt-7 sm:hover:mt-7 mb-4 hover:mb-1 rounded-2xl py-2"
              >
                <div className="flex flex-col mr-4 w-[50px] items-center">
                  <img src={chart} alt="bulb" className="w-[30px]" />
                </div>
                <div className="text-[12px]">
                  <div className="font-bold">Wachse im Team:</div>
                  <div>
                    Sicherheit gewinnen
                    <br />
                    durch geteiltes Wissen.
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-row w-[80%] items-center bg-white shadow-lg  mt-10 sm:mt-1 mb-4 rounded-2xl py-2">
            <div className="flex place-items-start mx-3">
              <img
                src={pflegefachkraft}
                alt=""
                className="w-[80px] sm:w-[40px]"
              />
            </div>
            <div className="mr-2">
              <div className="text-[12px]">
                "Dank der App fühle ich mich auch in schwierigen Situationen
                nicht allein gelassen.
                <br /> Es ist, als hätte ich einen Mentor in der Kitteltasche."
              </div>
              <div className="text-[10px] text-cyan-600">
                - Junge Pflegefachkraft
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
