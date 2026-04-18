import { useEffect, useState } from "react";
import ResultCard from "@/components/objects/ResultCard";
import KategorieLabelList from "@/components/objects/KategorieLabelList";
import { InfoBox } from "@/components/objects/Infobox";
import InterviewDetails from "@/components/objects/InterviewDetails";

import { useRequestDbContext } from "@/context";

export default function Page_Suchen() {
  const {
    solutionColl,
    problemColl,
    showInterviewDetails,
    getInterviewSelection,
    setDisplayData,
    displayData,
  } = useRequestDbContext();
  const [changed, setChanged] = useState(false);
  const [problemSelection, setProblemSelection] = useState<
    Array<keyValuePair> | []
  >([]);
  const [solutionSelection, setSolutionSelection] = useState<
    Array<keyValuePair> | []
  >([]);

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

      setChanged(true);
    }
  };

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
      setChanged(true);
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
      setChanged(true);
    } else if (parentType === "problem") {
      const currentselection = [...problemSelection];
      const deleteIndex = currentselection.findIndex((item) => item.key == key);
      const deleteditem = currentselection.splice(deleteIndex, 1);

      setProblemSelection(currentselection);
      setChanged(true);
    } else {
      return false;
    }

    return true;
  };

  const triggerSuchResultat = async () => {
    //setThinking(true);
    console.log("Suche interviews für");
    console.log("Probleme:", problemSelection);
    console.log("Lösungen:", solutionSelection);

    const problemids = problemSelection.map((problem) => problem.key);
    const solutionids = solutionSelection.map((solution) => solution.key);

    const interviewresults = await getInterviewSelection({
      problemids: problemids,
      solutionids: solutionids,
    });

    if (!interviewresults) {
    }
    console.log("Trigger Suche interviewresults:", interviewresults);
    setDisplayData(interviewresults);

    //setThinking(false);
  };

  useEffect(() => {
    if (changed) triggerSuchResultat();

    console.log("Page_Suchen showInterviewDetails:", showInterviewDetails);
    console.log("Page_Suchen displayData:", displayData);

    setChanged(false);
  }, [changed]);

  return (
    <>
      {showInterviewDetails ? (
        <main
          id="interview_details_main"
          className="flex flex-col w-full absolute top-0 h-full items-center z-50 bg-[#dffafa]"
        >
          <InterviewDetails />
        </main>
      ) : (
        <main
          id="suchen_main"
          className="flex flex-col items-center w-full sm:w-[800px] mt-40 sm:mt-65 mb-60 sm:mb-140 overflow-hidden z-2"
        >
          <InfoBox
            titelicon="team"
            infotitel="Das Archiv durchsuchen"
            infotext="Der Kitteltaschenmentor gibt dir die Gelegenheit das gesamte
              Archiv zu durchsuchen. Für die Suche wähle eine Kombination von
              Problem und Lösungskategorien, nach denen der Inhalt gefiltert
              wird."
          />
          <div
            id="kategorie_select_container"
            className="flex flex-col  w-[65%] sm:w-[65%]  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <div className="flex flex-col w-full px-2 pt-1 items-center mb-3">
              <div className="flex place-self-start mb-2 font-bold text-[12px] sm:text-sm text-cyan-700">
                Bitte Problemkategorie wählen:
              </div>
              <select
                className="text-[12px] sm:text-[16px] w-full pl-2 bg-white font-mono text-cyan-700 border-1"
                onChange={handleAddToProblemSelection}
              >
                {problemColl.map((problem, index) => (
                  <option key={problem.key} value={problem.key}>
                    {problem.value}
                  </option>
                ))}
              </select>
              <div className="flex place-self-start mb-2 font-bold text-[12px] sm:text-sm text-cyan-700">
                Bitte Lösungskategorie wählen:
              </div>
              <select
                className="text-[12px] sm:text-[16px] w-full pl-2 bg-white font-mono text-cyan-700 border-1"
                onChange={handleAddToSolutionSelection}
              >
                {solutionColl.map((problem, index) => (
                  <option key={problem.key} value={problem.key}>
                    {problem.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            id="kategorie_container"
            className="flex flex-col  w-[65%] sm:w-[65%]  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <div className="flex flex-col w-full px-2 pt-1 items-start mb-3">
              <div className="flex place-self-start mb-2 font-bold text-[12px] sm:text-sm text-cyan-700">
                Gewählte Problemkategorien:
              </div>
              <KategorieLabelList
                collection={problemSelection}
                handleRemove={handleRemove}
                istProblem="true"
                istaktiv="true"
              />
              <div className="flex place-self-start mb-2 font-bold text-[12px] sm:text-sm text-cyan-700">
                Gewählte Lösungskategorien:
              </div>
              <KategorieLabelList
                collection={solutionSelection}
                handleRemove={handleRemove}
                istProblem="false"
                istaktiv="true"
              />
            </div>
          </div>
          <div
            id="kategorie_container"
            className="flex flex-col  w-[65%] sm:w-[65%]  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <div className="flex flex-col w-full px-2 pt-1 items-start mb-3">
              <div className="flex place-self-start mb-2 font-bold text-[12px] sm:text-sm text-cyan-700">
                Antworten:
              </div>
              <div className="flex flex-col">
                {displayData.map((datarecord) => (
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
      )}
    </>
  );
}
