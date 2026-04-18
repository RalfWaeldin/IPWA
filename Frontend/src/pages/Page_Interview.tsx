import Information from "@/components/objects/symbols/Information";
import { useInterviewAgentContext, useInterviewDbContext } from "@/context";
import { useState, type SubmitEventHandler } from "react";
import { toast } from "react-toastify";

type InterviewFormState = {
  prompt: string;
};

export default function Page_Interview() {
  const { handleInterviewErfassung, setThinking } = useInterviewAgentContext();
  const { handleAcceptedInterview } = useInterviewDbContext();
  const [isErfassung, setErfassung] = useState<boolean>(true);
  const [enabledButton, setEnabledButton] = useState<boolean>(true);
  const [{ prompt }, setForm] = useState<InterviewFormState>({
    prompt: "",
  });
  const [analysisResult, setAnalysisResult] = useState<InterviewAnalysisDate>({
    finaltext: "",
    problem: "",
    problemCategories: [""],
    solutions: [{ solutionIdentifier: "", solutionPhrases: [""] }],
  });

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitButtonStatus(e.target.form as HTMLFormElement);
  };

  function setSubmitButtonStatus(form: HTMLFormElement) {
    const formelements = form?.elements;
    const elementarray = Array.from(formelements);

    const problemarray = elementarray.filter((element) => {
      return (
        element.id.startsWith("problemcategory_") &&
        (element as HTMLInputElement).checked
      );
    });

    const solutionarray = elementarray.filter((element) => {
      return (
        element.id.startsWith("solution_") &&
        (element as HTMLInputElement).checked
      );
    });

    const enablebutton = problemarray.length > 0 && solutionarray.length > 0;

    setEnabledButton(!enablebutton);
  }

  const handleErfassungsSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      if (!prompt) throw new Error("The interview text is required");
      setThinking(true);
      // console.log(email, password);
      // TODO: Add login logic

      const result: InterviewAnalysisDate = await handleInterviewErfassung({
        prompt,
      });
      toast.success("Login attempted (not implemented)");

      setAnalysisResult(result);
      console.log("Received:", JSON.stringify(result));

      setErfassung(false);
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      console.log(message);
      toast.error(message);
    } finally {
      setThinking(false);
    }
  };

  const handleAnalyseSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    setThinking(true);
    console.log("INPUT:", analysisResult);

    try {
      const form = e.target;
      const elements = form.elements;
      const elementarray = Array.from(elements);

      // get checked problems
      const problemarray = elementarray.filter((element) => {
        return (
          element.id.startsWith("problemcategory_") &&
          (element as HTMLInputElement).checked
        );
      });
      // get checked solutions
      const solutionarray = elementarray.filter((element) => {
        return (
          element.id.startsWith("solution_") &&
          (element as HTMLInputElement).checked
        );
      });

      const outputResult: AcceptedInterviewData = {
        acceptedData: {
          finaltext: analysisResult.finaltext,
          problem: analysisResult.problem,
          problemCategories: [],
          solutions: [],
        },
      };

      problemarray.forEach((problemelement) => {
        const problemidentifier = problemelement.id;
        console.log("PROBLEM ID", problemidentifier);
        const isChecked = (problemelement as HTMLInputElement).checked;
        console.log("IsChecked", isChecked);
        if (isChecked) {
          console.log("ADD PROBLEM:", problemelement.value);
          outputResult.acceptedData.problemCategories.push(
            problemelement.value,
          );
        }
      });

      solutionarray.forEach((solutionelement) => {
        const solutionidentifier = solutionelement.id;
        console.log("SOLUTION ID", solutionidentifier);
        const isChecked = (solutionelement as HTMLInputElement).checked;
        console.log("IsChecked", isChecked);
        if (isChecked) {
          //outputResult.problemCategories.findIndex(problemidentifier)
          console.log("ADD PROBLEM:", solutionelement.value);
          const solution: SolutionElement = {
            solutionIdentifier: solutionelement.value,
            solutionPhrases: [],
          };
          const inputsolution = analysisResult.solutions.find(
            (inputsolution) =>
              inputsolution.solutionIdentifier == solution.solutionIdentifier,
          );
          if (inputsolution?.solutionPhrases != undefined)
            solution.solutionPhrases = inputsolution.solutionPhrases;
          //solution.solutionPhrases = inputsolution?.solutionPhrases;
          outputResult.acceptedData.solutions.push(solution);
        }
      });

      console.log("OUTPUT:", outputResult);

      const result = await handleAcceptedInterview({
        acceptedData: outputResult,
      });
      console.log("DB insert:", JSON.stringify(result));
    } finally {
      setThinking(false);
    }
  };

  return (
    <main
      id="interview_main"
      className="flex flex-col items-center w-full sm:w-[800px] mt-70 sm:mt-70 mb-60 sm:mb-140 overflow-hidden z-2"
    >
      {isErfassung ? (
        <div className="h-fit w-10/12 bg-cyan-200 rounded-2xl ">
          <div className="h-7 pl-2 pt-1 text-[12px] text-white rounded-t-2xl bg-cyan-700 pt-1 bp-2">
            Interview erfassen
          </div>
          <div className="p-2 w-full">
            <form
              id="erfassungsform"
              name="erfassungsform"
              className="bg-cyan-50 w-full rounded-b-xl"
              onSubmit={handleErfassungsSubmit}
            >
              <div className="grid grid-cols-1 gap-3 w-full p-2">
                <div className="flex flex-col">
                  <label
                    id="interviewlabel"
                    htmlFor="prompt"
                    className="label text-[12px] text-cyan-700 mb-1"
                  >
                    <span className="label-text">Interview:</span>
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    onChange={handleTextAreaChange}
                    className="bg-white text-[12px] h-30  border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-2"
                    placeholder="Ihr Interview"
                  />
                </div>

                <div className="flex flex-col mt-5">
                  <button
                    id="submit"
                    type="submit"
                    className="btn btn-block btn-sm text-[12px]"
                  >
                    Analysieren
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-fit w-8/12 bg-cyan-200 rounded-2xl mb-5 ">
          <div className="h-7 pl-2 pt-1 bg-cyan-700 text-white text-[12px] rounded-t-2xl ">
            Analyse Resultat
          </div>
          <div className="p-2 w-full">
            <form
              id="analyseform"
              name="analyseform"
              className="bg-cyan-50 w-full  rounded-b-2xl"
              onSubmit={handleAnalyseSubmit}
            >
              <div className="grid grid-cols-1 gap-3 w-full rounded-b-2xl p-2">
                <div className="flex flex-col">
                  <label
                    id="interviewlabel"
                    htmlFor="finaltext"
                    className="label text-[12px] text-cyan-700 mb-1"
                  >
                    <span className="label-text">Anonymisiert:</span>
                  </label>
                  <textarea
                    id="finaltext"
                    name="finaltext"
                    className="bg-white text-[11px] font-light h-30 border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1 sm:p-2"
                    readOnly
                    scroll-top
                    value={analysisResult.finaltext}
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label
                    id="problemlabel"
                    htmlFor="problem"
                    className="label text-[12px] text-cyan-700 mb-1"
                  >
                    <span className="label-text">Problem:</span>
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    className="bg-white font-light text-[10px] h-20 border-2 border-t-cyan-200 border-r-cyan-500 border-b-cyan-600 border-l-cyan-300 p-1 sm:p-2 mb-2"
                    readOnly
                    value={analysisResult.problem}
                  ></textarea>
                  <div className="grid grid-cols-1">
                    {analysisResult.problemCategories.map((category, index) => (
                      <label className="text-cyan-700 text-[12px] font-light text-nowrap mr-5">
                        <input
                          type="checkbox"
                          id={"problemcategory_" + index}
                          name={"problemcategory_" + index}
                          className=""
                          readOnly
                          onChange={handleCheckboxChange}
                          value={category}
                        />{" "}
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    id="loesunglabel"
                    htmlFor="loesung"
                    className="label text-[12px] text-cyan-700"
                  >
                    <span className="label-text">Lösung:</span>
                  </label>
                  {analysisResult.solutions.map((solution, index) => (
                    <div className=" flex text-cyan-700 text-[12px]  font-light text-[10px] text-nowrap">
                      <label>
                        <input
                          id={"solution_" + index}
                          name={"solution_" + index}
                          type="checkbox"
                          className="mr-1"
                          readOnly
                          onChange={handleCheckboxChange}
                          value={solution.solutionIdentifier}
                        />
                        <span>
                          {solution.solutionIdentifier.length > 40
                            ? solution.solutionIdentifier.substring(0, 40) + "…"
                            : solution.solutionIdentifier}
                        </span>
                      </label>
                      <div className="w-1"></div>
                      <div
                        id={"solutioninformation_" + index}
                        className="hidden md:flex hover:cursor-help"
                      ></div>
                    </div>
                  ))}

                  <div className="flex flex-col mt-5">
                    <button
                      id="cancel"
                      type="submit"
                      className="btn btn-block btn-sm text-[12px] text-cyan-700 bg-cyan-200 border-cyan-700 shadow-xs mb-1"
                    >
                      Verwerfen
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <button
                      id="submit"
                      type="submit"
                      disabled={enabledButton}
                      className="btn btn-block btn-sm text-[12px] bg-cyan-700 text-white disabled:bg-gray-300 disabled:text-gray-400"
                    >
                      Eintragen
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
