import { useEffect, useState } from "react";
import bg from "@/assets/bg.svg";
import team from "@/assets/team.png";
import ResultCard from "@/components/objects/resultcard";
import KategorieLabelList from "@/components/objects/KategorieLabelList";
import { useRequestDbContext } from "@/context";

export default function Page_Suchen() {
  const [loading, setLoading] = useState(false);

  const { solutionColl, problemColl } = useRequestDbContext();

  const [problemSelection, setProblemSelection] = useState<
    Array<keyValuePair> | []
  >([]);
  const [solutionSelection, setSolutionSelection] = useState<
    Array<keyValuePair> | []
  >([]);

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
  function handleChange() {}

  const handleAddToProblemSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const problemSelectedOption =
      e.target.options[e.target.options.selectedIndex];
    const problemName = problemSelectedOption.text;
    const problemIdentifier = problemSelectedOption.value;
    const newValue: keyValuePair = {
      key: problemIdentifier,
      value: problemName,
    };
    const currentselection = [...problemSelection];
    if (!currentselection.find(({ key }) => key == newValue.key)) {
      currentselection.push(newValue);
      setProblemSelection(currentselection);
    }
  };

  //handleClickProblemSelection

  const handleAddToSolutionSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log("ENTER change");
    const solutionSelectedOption =
      e.target.options[e.target.options.selectedIndex];
    const solutionName = solutionSelectedOption.text;
    const solutionIdentifier = solutionSelectedOption.value;
    const newValue: keyValuePair = {
      key: solutionIdentifier,
      value: solutionName,
    };
    const currentselection = [...solutionSelection];
    if (!currentselection.find(({ key }) => key == newValue.key)) {
      currentselection.push(newValue);
      setSolutionSelection(currentselection);
    }
  };

  const handleRemove = (key, event): boolean => {
    const parent: string = event.target.parentElement.id;
    const parentType = parent.split("_")[0];

    if (parentType === "solution") {
      const currentselection = [...solutionSelection];
      const deleteIndex = currentselection.findIndex((item) => item.key == key);
      const deleteditem = currentselection.splice(deleteIndex, 1);
      setSolutionSelection(currentselection);
    } else if (parentType === "problem") {
      const currentselection = [...problemSelection];
      const deleteIndex = currentselection.findIndex((item) => item.key == key);
      const deleteditem = currentselection.splice(deleteIndex, 1);

      setProblemSelection(currentselection);
    } else {
      return false;
    }

    return true;
  };

  const cardtext =
    "Ein Bewohner verweigert die Nahrungsaufnahme durch körperliche Abwehrreaktionen gegenüber der Pflegefachkraft, was die pflegerische Versorgung und die Ernährungssicherung gefährdet.";
  const problems = [
    "Nahrungsverweigerung",
    "Abwehrverhalten",
    "Interaktionsstörung",
  ];
  const solutions = ["Hand-under-Hand Methode"];

  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <div
        style={{ position: "absolute", zIndex: 0 }}
        className="h-full overflow-hidden"
      >
        <img src={bg} alt="Hintergrund" className="w-[800px]" />
      </div>
      <div style={{ zIndex: 1 }} className="w-[80%] mt-5">
        <div className="">
          <div className="flex flex-row mb-2">
            <div className="mr-2">
              <img src={team} alt="Frage" className="w-5.5 sm:w-7.5" />
            </div>
            <div className="text-[18px] sm:text-[24px] font-bold text-cyan-700">
              Das Archiv durchsuchen
            </div>
          </div>
          <div className="text-[14px] sm:text-[18px] mb-2 text-cyan-700">
            Der Kitteltaschenmentor gibt Dir die Gelegenheit das gesamte Archiv
            zu durchsuchen. Für die Suche wähle eine Kombination von Problem und
            Lösungskategorien, nach denen der Inhalt gefiltert wird.
          </div>
          <div style={{ zIndex: 1 }} className="h-screen text-[12px] w-full">
            <div className="flex flex-col content-start w-full text-[12px] sm:text-sm mt-2">
              <div className="flex flex-col gap-2 mb-2">
                <div
                  className="text-[14px] sm:text-[18px] font-bold
                text-cyan-700 mt-2"
                >
                  Bitte Problemkategorie wählen:
                </div>
                <select
                  className="text-[12px] sm:text-[16px] w-full pl-2 text-cyan-700 border-1"
                  onChange={handleAddToProblemSelection}
                >
                  {problemColl.map((problem, index) => (
                    <option key={problem.key} value={problem.key}>
                      {problem.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <KategorieLabelList
                  collection={problemSelection}
                  handleRemove={handleRemove}
                  istProblem="true"
                  istaktiv="true"
                />
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <div
                  className="text-[14px] sm:text-[18px] font-bold
                text-cyan-700 mt-2"
                >
                  Bitte Lösungskategorie wählen:
                </div>
                <select
                  className="text-[12px] sm:text-[16px] w-full pl-2 text-cyan-700 border-1"
                  onChange={handleAddToSolutionSelection}
                >
                  {solutionColl.map((solution, index) => (
                    <option key={solution.key} value={solution.key}>
                      {solution.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <KategorieLabelList
                  collection={solutionSelection}
                  handleRemove={handleRemove}
                  istProblem="false"
                  istaktiv="true"
                />
              </div>
              <div className="text-[14px] sm:text-[18px] font-bold text-cyan-700 border-b-1 mb-4">
                Antworten
              </div>
              <div className="flex flex-col gap-2">
                {diplayData.map((datarecord) => (
                  <ResultCard
                    resultText={datarecord.cardtext}
                    problemlist={datarecord.problems}
                    solutionlist={datarecord.solutions}
                  />
                ))}
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </main>
  );
}
