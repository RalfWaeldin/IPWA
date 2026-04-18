import ResultCard from "@/components/objects/ResultCard";
import { InfoBox } from "@/components/objects/Infobox";
import {
  useState,
  useEffect,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react";
import { toast } from "react-toastify";
import { useInterviewAgentContext, useRequestDbContext } from "@/context";
import KategorieLabelList from "@/components/objects/KategorieLabelList";
import InterviewDetails from "@/components/objects/InterviewDetails";

type keyValuePair = {
  key: string;
  value: string;
};

export default function Page_Fragen() {
  const { handleGetInterviewSets, handleCustomerFrage, thinking, setThinking } =
    useInterviewAgentContext();
  const {
    problemColl,
    showInterviewDetails,
    setShowInterviewDetails,
    setDisplayData,
    displayData,
  } = useRequestDbContext();
  //const [loading, setLoading] = useState(false);

  const [germanInterviews, setGermanInterviews] = useState([]);
  const [foreignInterviews, setForeignInterviews] = useState([]);

  const [germanCategories, setGermanCategories] = useState<keyValuePair[] | []>(
    [],
  );
  const [foreignCategories, setForeignCategories] = useState<
    keyValuePair[] | []
  >([]);
  const [chosenCategories, setChosenCategories] = useState<keyValuePair[] | []>(
    [],
  );
  const [languageCollection, setLanguageCollection] = useState<
    keyValuePair[] | []
  >([]);
  const [fragen, setFragen] = useState<keyValuePair[] | []>([]);
  const [frage, setFrage] = useState<string>("");
  //const [diplayData, setDisplayData] = useState<
  //  Array<RequestAnswerResultDataType> | []
  //>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Deutsch");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!prompt) throw new Error("The interview text is required");
      setThinking(true);

      const frage = e.target.frage.value;

      // frage , problempairs

      const result: CustomerAnswerDataType = await handleCustomerFrage({
        frage: frage,
        problempairs: problemColl,
      });
      //toast.success("Login attempted (not implemented)");

      console.log("Received:", JSON.stringify(result));

      setGermanCategories(result.Deutsch.Categories);
      let determinedLanguage = "Deutsch";
      if (result.Fremdsprache && result.Fremdsprache.language != "German") {
        setForeignCategories(result.Fremdsprache.Categories);
        setChosenCategories(result.Fremdsprache.Categories);
        const languagecollectionvalues = [
          { key: "Fremd", value: result.Fremdsprache.language },
          { key: "Deutsch", value: "Deutsch" },
        ];
        setLanguageCollection(languagecollectionvalues);
        setFragen([
          { key: "Fremd", value: result.Fremdsprache.Frage },
          { key: "Deutsch", value: result.Deutsch.Frage },
        ]);
        setFrage(result.Fremdsprache.Frage);
        setSelectedLanguage(result.Fremdsprache.language);
        determinedLanguage = result.Fremdsprache.language;
      } else {
        setForeignCategories([]);
        setChosenCategories(result.Deutsch.Categories);
        const languagecollectionvalues = [{ key: "Deutsch", value: "Deutsch" }];
        setLanguageCollection(languagecollectionvalues);
        setFragen([{ key: "Deutsch", value: result.Deutsch.Frage }]);
        setFrage(result.Deutsch.Frage);
        setSelectedLanguage("Deutsch");
      }
      const problemids = result.Deutsch.Categories.map((item) => item.key);
      const interviewsresult: InterviewsDataType = await handleGetInterviewSets(
        {
          language: determinedLanguage,
          problemids: problemids,
        },
      );
      console.log("Result Language", interviewsresult.language);
      console.log("Result interviews", interviewsresult.interviews);

      //setChosenInterviews(interviewsresult.interviews);
      setDisplayData(interviewsresult.interviews);
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      console.log(message);
      toast.error(message);
    } finally {
      setThinking(false);
    }
  };

  const handleDummyRemove = (
    key: string,
    event: MouseEventHandler,
  ): boolean => {
    return false;
  };

  const handleLanguageSelection = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const problemSelectedOption =
      e.target.options[e.target.options.selectedIndex];
    const languageIdentifier = problemSelectedOption.value;
    const newLanguage = problemSelectedOption.innerText;

    if (languageIdentifier == "Deutsch") {
      setChosenCategories(germanCategories);
      const deutschfrage = fragen.find(
        (element) => element.key == "Deutsch",
      )?.value;
      if (deutschfrage) setFrage(deutschfrage);
    } else {
      setChosenCategories(foreignCategories);
      const fremdfrage = fragen.find(
        (element) => element.key == "Fremd",
      )?.value;
      if (fremdfrage) setFrage(fremdfrage);
    }
    setSelectedLanguage(newLanguage);

    try {
      setThinking(true);

      const problemids = chosenCategories.map((item) => item.key);
      const interviewsresult: InterviewsDataType = await handleGetInterviewSets(
        {
          language: newLanguage,
          problemids: problemids,
        },
      );
      console.log("Result Language", interviewsresult.language);
      console.log("Result interviews", interviewsresult.interviews);

      //setChosenInterviews(interviewsresult.interviews);
      setDisplayData(interviewsresult.interviews);
    } catch (error) {
    } finally {
      setThinking(false);
    }
  };

  function handleChange<HTMLTextAreaElement>() {}

  useEffect(() => {
    console.log("Page_Fragen showInterviewDetails:", showInterviewDetails);
    console.log("Page_Fragen displayData:", displayData);
  }, []);

  return (
    <>
      {showInterviewDetails ? (
        <InterviewDetails />
      ) : (
        <main
          id="fragen_main"
          className="flex flex-col items-center w-full sm:w-[800px] mt-60 sm:mt-70 mb-60 sm:mb-140 overflow-hidden z-2"
        >
          <InfoBox
            titelicon="bulb"
            infotitel="Den Assistenten fragen"
            infotext="Wie kann ich dir weiterhelfen? Gib deine Frage ein:"
          />
          <div
            id="frage_form_container"
            className="flex flex-col  w-[65%] sm:w-[65%]  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <form className=" w-full px-2 " onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  id="fragelabel"
                  htmlFor="frage"
                  className="flex w-full label text-[12px] sm:text-sm pb-1 text-cyan-700"
                >
                  <span className="label-text">Frage:</span>
                </label>
                <textarea
                  id="frage"
                  name="frage"
                  onChange={handleChange}
                  className="flex flex-row w-full h-15 px-1 mb-1 text-[12px] bg-white font-mono"
                  placeholder="Deine Frage"
                />
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-xs w-fit text-cyan-700 border-cyan-700 bg-cyan-50 self-end mb-1 shadow"
                  disabled={thinking}
                >
                  Abschicken
                </button>
              </div>
            </form>
          </div>
          <div
            id="sprachwahl_container"
            className="flex flex-col  w-[65%] sm:w-[65%] px-2  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <div className="flex place-self-start text-[12px] sm:text-sm text-cyan-700 mb-1">
              Sprachwahl:
            </div>
            <select
              className="text-[12px] sm:text-[16px] w-full pl-2 bg-white font-mono text-cyan-700 mx-2 mb-2 border-1"
              onChange={handleLanguageSelection}
            >
              {languageCollection.map((problem, index) => (
                <option key={problem.key} value={problem.key}>
                  {problem.value}
                </option>
              ))}
            </select>
          </div>
          <div
            id="analyse_container"
            className="flex flex-col  w-[65%] sm:w-[65%]  ml-4 sm:ml-10 items-center rounded-xl border-1 border-gray-100 bg-cyan-200 shadow-[#00669999] shadow mb-3"
          >
            <div className="flex flex-col w-full px-2 pt-1 items-center border-b-1 mb-3">
              <div className="flex place-self-start mb-2 text-[12px] sm:text-sm text-cyan-700">
                Deine Frage:
              </div>
              <div className="flex place-self-start font-mono mb-2 text-[12px] sm:text-sm text-cyan-700">
                {frage}
              </div>
            </div>

            <div className="flex flex-col w-full items-start mb-3">
              <div className="flex place-self-start ml-2 mb-2 text-[12px] sm:text-sm text-cyan-700">
                Erkannte Kategorien
              </div>
              <div className="flex flex-row flex-wrap items-start gap-1 p-2">
                <KategorieLabelList
                  collection={chosenCategories}
                  handleRemove={handleDummyRemove}
                  istProblem="true"
                  istaktiv="false"
                />
              </div>
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
