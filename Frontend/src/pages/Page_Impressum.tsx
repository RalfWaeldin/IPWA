import ralf from "@/assets/ralf2.jpg";

export default function Page_Impressum() {
  return (
    <main className="flex flex-col items-center w-full mt-75 sm:mt-50 overflow-hidden">
      <div
        style={{ zIndex: 1 }}
        className="flex flex-col h-screen text-[12px] sm:text-[18px] w-[70%] sm:w-[500px] gap-4 mb-100 mt-28 sm:mt-70"
      >
        <div>
          <img src={ralf} alt="" />
        </div>
        <div className=" bg-cyan-50 shadow-2xl rounded-2xl p-2">
          <div className="font-bold">"The Retro-Designer"</div>
          <div>
            aka Ralf Wäldin
            <br />
            Hauptstr. 77e
            <br />
            79295 Sulzburg
          </div>
        </div>
        <div className=" bg-cyan-50 shadow-2xl rounded-2xl p-2">
          <div className="font-bold">Kontakt:</div>
          <div>
            Telefon: 0160 753 95 35
            <br />
            E-Mail: ralf@waeldin.info
          </div>
        </div>
        <div className=" bg-cyan-50 shadow-2xl rounded-2xl p-2">
          <div className="font-bold">Datenschutz</div>
          <div>
            Bei dieser Webseite handelt es sich um ein Abschlussprojekt <br />
            im Rahmen der Ausbildung zum <br />
            "KI Software Entwickler" der{" "}
            <a href="https://www.wbscodingschool.com/" target="_blank">
              <span className="text-red-600 font-black">WBS-CODING-SCHOOL</span>
            </a>
            . <br />
            <br />
            Alle Daten werden anonymisiert, bevor sie abgespeichert werden!
          </div>
        </div>
      </div>
    </main>
  );
}
