import Information from "@/components/objects/symbols/Information";
import { useInterviewAgentContext, useInterviewDbContext } from "@/context";
import { useState, type SubmitEventHandler } from "react";
import { toast } from "react-toastify";

type InterviewFormState = {
  prompt: string;
};

export default function Page_Interview() {
  const { handleInterviewErfassung } = useInterviewAgentContext();
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

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleAnalyseSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    console.log("INPUT:", analysisResult);

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
        outputResult.acceptedData.problemCategories.push(problemelement.value);
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
  };

  return (
    <main className="flex content-center items-center p-2 mx-auto sm:w-full flex-col w-full h-screen">
      {isErfassung ? (
        <div className="h-fit w-10/12 bg-white">
          <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
            Interview erfassen
          </div>
          <div className="p-2 w-full">
            <form
              id="erfassungsform"
              name="erfassungsform"
              className="bg-gray-300 w-full"
              onSubmit={handleErfassungsSubmit}
            >
              <div className="grid grid-cols-1 gap-3 w-full p-2">
                <div className="flex flex-col">
                  <label
                    id="interviewlabel"
                    htmlFor="prompt"
                    className="label text-[12px] text-gray-100"
                  >
                    <span className="label-text">Interview:</span>
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    onChange={handleTextAreaChange}
                    className="bg-white text-[12px] h-30"
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
        <div className="h-fit w-10/12 bg-white">
          <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
            Analyse Resultat
          </div>
          <div className="p-2 w-full">
            <form
              id="analyseform"
              name="analyseform"
              className="bg-gray-300 w-full"
              onSubmit={handleAnalyseSubmit}
            >
              <div className="grid grid-cols-1 gap-3 w-full p-2">
                <div className="flex flex-col">
                  <label
                    id="interviewlabel"
                    htmlFor="finaltext"
                    className="label text-[12px] text-gray-100"
                  >
                    <span className="label-text">Anonymisiert:</span>
                  </label>
                  <textarea
                    id="finaltext"
                    name="finaltext"
                    className="bg-gray-300 text-[10px]  font-light h-30"
                    readOnly
                    scroll-top
                    value={analysisResult.finaltext}
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label
                    id="problemlabel"
                    htmlFor="problem"
                    className="label text-[12px] text-gray-100"
                  >
                    <span className="label-text">Problem:</span>
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    className="bg-gray-300 font-light text-[10px] h-20"
                    readOnly
                    value={analysisResult.problem}
                  ></textarea>
                  <div className="grid grid-cols-1">
                    {analysisResult.problemCategories.map((category, index) => (
                      <label className="font-light text-[10px] text-nowrap mr-5">
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
                    className="label text-[12px] text-gray-100"
                  >
                    <span className="label-text">Lösung:</span>
                  </label>
                  {analysisResult.solutions.map((solution, index) => (
                    <div className=" flex font-light text-[10px] text-nowrap">
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
                      >
                        <Information
                          width="12"
                          height="12"
                          colors={{
                            Border: "#0000ff",
                            Filling: "#aaaaff",
                            I: "#0000ff",
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col mt-5">
                    <button
                      id="cancel"
                      type="submit"
                      className="btn btn-block btn-sm text-[12px]"
                    >
                      Verwerfen
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <button
                      id="submit"
                      type="submit"
                      disabled={enabledButton}
                      className="btn btn-block btn-sm text-[12px]"
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
