import { type MouseEventHandler } from "react";
import { useRequestDbContext, useInterviewAgentContext } from "@/context";
import KategorieLabelList from "./KategorieLabelList";
import Deutsch from "@/assets/Deutsch.png";
import English from "@/assets/English.png";
import French from "@/assets/French.png";
import Polish from "@/assets/Polish.png";
import Italian from "@/assets/Italian.png";
import Romanian from "@/assets/Romanian.png";
import Croatian from "@/assets/Croatian.png";
import Mentor from "@/assets/Pflegefackkaft.png";

export default function InterviewDetails() {
  const {
    chosenInterview,
    setShowInterviewDetails,
    setChosenInterview,
    getTranslatedInterview,
  } = useRequestDbContext();

  const { setThinking } = useInterviewAgentContext();
  console.log("InterviewDetails:", chosenInterview);

  const languageselection = [
    { language: "Deutsch", icon: Deutsch },
    { language: "English", icon: English },
    { language: "French", icon: French },
    { language: "Polish", icon: Polish },
    { language: "Italian", icon: Italian },
    { language: "Romanian", icon: Romanian },
    { language: "Croatian", icon: Croatian },
  ];

  const handleDummyRemove = (
    key: string,
    event: MouseEventHandler,
  ): boolean => {
    return false;
  };

  const handleClose = (event: MouseEventHandler): void => {
    setShowInterviewDetails(false);
  };

  const handleChangeLanguage = async (
    event: MouseEventHandler<HTMLImageElement>,
  ): void => {
    const imgElement = event.target as HTMLImageElement;
    const sprache = imgElement.id;
    console.log("handleChangeLanguage:", sprache);

    const currentinterview = chosenInterview as SingleInterviewDataType;
    const interviewid = currentinterview.interviewtext.key;

    setThinking(true);
    const translatedinterview = await getTranslatedInterview({
      interviewid: interviewid,
      language: sprache,
    });

    console.log("TransladedInterviewDetails:", translatedinterview);
    setChosenInterview(translatedinterview);
    setThinking(false);
  };

  console.log("InterviewDetails:", chosenInterview);
  return (
    <div
      id="interviewdetails_container"
      className="flex flex-col self-center absolute top-0 w-full sm:w-[800px] h-screen z-42 bg-[url(/src/assets/hgpatten.png)] overflow-hidden"
    >
      <div
        onClick={handleClose}
        className="flex self-end mt-2 mr-2 px-2 py-1 text-[12px] rounded-xl bg-[#ffffff99] hover:bg-[#ffffffcc] shadow cursor-pointer "
      >
        X Schließen
      </div>

      <div className="flex self-center w-[90%] mt-4">
        <div className="flex flex-col w-21/24 sm:w-11/12">
          <div
            id="interview-Image"
            className="flex self-center w-[90%] mb-4 border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-1 overflow-scroll"
          >
            <img src={Mentor} alt="" className="w-full" />
          </div>
          <div
            id="interview-text"
            className="flex self-center w-[90%] h-40 border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-2 overflow-scroll"
          >
            {chosenInterview.interviewtext.value}
          </div>
          <div
            id="interview-categories"
            className="flex flex-row flex-wrap self-center w-[90%] h-20 border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-2 mt-4 gap-x-1 sm:gap-y-2 overflow-scroll"
          >
            <KategorieLabelList
              collection={chosenInterview.problems}
              handleRemove={handleDummyRemove}
              istProblem="true"
              istaktiv="false"
            />
            <KategorieLabelList
              collection={chosenInterview.solutions}
              handleRemove={handleDummyRemove}
              istProblem="false"
              istaktiv="false"
            />
          </div>
        </div>
        <div className="flex flex-col w-3/24 sm:w-1/12">
          {languageselection.map((item) => (
            <div className="w-full rounded-full mb-1 border-2 border-[#ffffff66] hover:border-[#ffffff99] hover:bg-[#ffffff66] shadow-emerald-600 shadox-2xl cursor-pointer">
              <img
                id={item.language}
                src={item.icon}
                alt=""
                onClick={handleChangeLanguage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
