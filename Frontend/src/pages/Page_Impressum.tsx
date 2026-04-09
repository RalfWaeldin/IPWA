import bg from "@/assets/bg.svg";

export default function Page_Impressum() {
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <div
        style={{ position: "absolute", zIndex: 0 }}
        className="h-full overflow-hidden"
      >
        <img src={bg} alt="Hintergrund" className="w-[800px]" />
      </div>
      <div style={{ zIndex: 1 }} className="h-screen text-[12px]">
        <div className="font-bold mt-4">Anbieter:</div>
        <div>
          Ralf Wäldin
          <br />
          Hauptstr. 77e
          <br />
          79295 Sulzburg
        </div>
        <div className="font-bold mt-4">Kontakt:</div>
        <div>
          Telefon: 0160 753 95 35
          <br />
          E-Mail: ralf@waeldin.info
        </div>
        <div className="font-bold mt-4">Datenschutz</div>
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
    </main>
  );
}
