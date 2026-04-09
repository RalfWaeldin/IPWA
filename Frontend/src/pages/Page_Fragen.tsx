import bg from "@/assets/bg.svg";
import bulb from "@/assets/bulb.svg";
import KategorieLabel from "@/components/objects/KategorieLabel";
import ResultCard from "@/components/objects/resultcard";
import { useState } from "react";

type keyValuePair = {
  key: string;
  value: string;
};

export default function Page_Fragen() {
  const [loading, setLoading] = useState(false);
  const [problemColl, setProblemColl] = useState<Array<keyValuePair> | []>([
    { key: "11111", value: "Aggression" },
    { key: "11112", value: "Nahrungsverweigerung" },
  ]);
  const [solutionColl, setSolutionColl] = useState<Array<keyValuePair> | []>([
    { key: "21111", value: "Hand-under-Hand" },
    { key: "21112", value: "Beschwichtigen" },
  ]);
  const [diplayData, setDisplayData] = useState<
    Array<RequestAnswerResultDataType> | []
  >([
    {
      cardtext: { key: "31111", value: "Ich bin eine Beschreibung" },
      problems: [
        { key: "11111", value: "Aggression" },
        { key: "11112", value: "Nahrungsverweigerung" },
      ],
      solutions: [
        { key: "21111", value: "Hand-under-Hand" },
        { key: "21112", value: "Beschwichtigen" },
      ],
    },
    {
      cardtext: {
        key: "31112",
        value: "Ich bin eine völlig andere Beschreibung",
      },
      problems: [{ key: "11111", value: "Aggression" }],
      solutions: [{ key: "21112", value: "Beschwichtigen" }],
    },
  ]);

  function handleSubmit() {}
  function handleChange<HTMLTextAreaElement>() {}
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <div
        style={{ position: "absolute", zIndex: 0 }}
        className="h-full overflow-hidden"
      >
        <img src={bg} alt="Hintergrund" className="w-[800px]" />
      </div>
      <div style={{ zIndex: 1 }} className="h-screen w-[80%]">
        <div className="mt-2">
          <div className="flex flex-row mb-2">
            <div className="mr-2">
              <img src={bulb} alt="Frage" className="w-5" />
            </div>
            <div className="text-[24px] font-bold text-cyan-700">
              Den Assistenten fragen
            </div>
          </div>
          <div className="mb-2 text-cyan-700">
            Wie kann ich Dir weiterhelfen?
          </div>

          <form className=" w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                id="emaillabel"
                htmlFor="email"
                className="flex w-full label text-[12px]  sm:text-sm text-cyan-700"
              >
                <span className="label-text">Frage:</span>
              </label>
              <textarea
                id="frage"
                name="frage"
                rows="5"
                onChange={handleChange}
                className="flex bg-white w-full text-[12px] font-mono shadow py-1 px-2"
                placeholder="Deine Frage"
              />
              <button
                id="submit"
                type="submit"
                className="btn btn-xs w-fit text-cyan-700 self-end mt-1 shadow"
                disabled={loading}
              >
                Abschicken
              </button>
            </div>
          </form>
          <div className="mb-2 text-cyan-700">Kategorien</div>
          <div className="flex flex-wrap gap-1">
            <KategorieLabel label="Aggression" istProblem="true" />
            <KategorieLabel label="Aufforderndes Verhalten" istProblem="true" />
            <KategorieLabel label="Nochmal" istProblem="true" />
            <KategorieLabel label="Einfühlung" />
            <KategorieLabel label="Anderes" />
          </div>
          <div className="mb-2 text-cyan-700">Antworten</div>
          <div>
            {diplayData.map((datarecord) => (
              <ResultCard
                resultText={datarecord.cardtext}
                problemlist={datarecord.problems}
                solutionlist={datarecord.solutions}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
