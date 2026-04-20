import { type MouseEventHandler } from "react";
import { useRequestDbContext, useInterviewAgentContext } from "@/context";
import AnimatedLogo from "./symbols/AnimatedLogo";
import KategorieLabelList from "./KategorieLabelList";
import Deutsch from "@/assets/Deutsch.png";
import English from "@/assets/English.png";
import French from "@/assets/French.png";
import Polish from "@/assets/Polish.png";
import Italian from "@/assets/Italian.png";
import Romanian from "@/assets/Romanian.png";
import Croatian from "@/assets/Croatian.png";
import Spanish from "@/assets/Spanish.png";
import Mentor from "@/assets/Pflegefackkaft.png";
import TextToVoiceOpenAI from "../TextToVoice/TextToVoiceOpenAI";

export default function InterviewDetails() {
  const {
    chosenInterview,
    selectedLanguage,
    setSelectedLanguage,
    setShowInterviewDetails,
    setChosenInterview,
    getTranslatedInterview,
  } = useRequestDbContext();

  const { setThinking, thinking, setIsPlaying } = useInterviewAgentContext();
  console.log("InterviewDetails:", chosenInterview);

  const languageselection = [
    { language: "Deutsch", icon: Deutsch, iso: "de-DE" },
    { language: "English", icon: English, iso: "en-US" },
    { language: "French", icon: French, iso: "fr-FR" },
    { language: "Polish", icon: Polish, iso: "pl-PL" },
    { language: "Italian", icon: Italian, iso: "it-IT" },
    { language: "Romanian", icon: Romanian, iso: "ro" },
    { language: "Croatian", icon: Croatian, iso: "hr" },
    { language: "Spanish", icon: Spanish, iso: "es-ES" },
  ];

  const handleDummyRemove = (
    key: string,
    event: MouseEventHandler,
  ): boolean => {
    return false;
  };

  const handleClose = (event: MouseEventHandler): void => {
    setIsPlaying(false);
    console.log("close Details: setPlaying(false)");
    setShowInterviewDetails(false);
  };

  const handleChangeLanguage = async (
    event: MouseEventHandler<HTMLImageElement>,
  ): void => {
    setIsPlaying(false);
    console.log("Change Details: setPlaying(false)");
    const imgElement = event.target as HTMLImageElement;
    const sprache = imgElement.id;
    console.log("handleChangeLanguage:", sprache);

    const sprachitem = languageselection.find(
      (item) => item.language == sprache,
    );
    const sprachtriple: LanguageTripleDataType = sprachitem
      ? sprachitem
      : { language: "Deutsch", icon: Deutsch, iso: "de-DE" };

    const currentinterview = chosenInterview as SingleInterviewDataType;
    const interviewid = currentinterview.interviewtext.key;
    setSelectedLanguage(sprachtriple);
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
    <>
      {thinking ? (
        <div
          id="Thinking_Layer"
          className="flex flex-col items-center absolute top-0 left-0 w-full h-screen z-50 bg-[#3399ccdd] "
        >
          <div className="absolute top-50 flex flex-col items-center h-50 w-50 text-[#00000] z-50">
            <div className="flex w-[200px]">
              <AnimatedLogo />
            </div>
            <div className="text-[20px] font-bold ">Dein Mentor denkt</div>
          </div>
        </div>
      ) : (
        <></>
      )}

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
              id="title-mentor"
              className="flex flex-row flex-wrap self-center w-[90%] px-2 font-bold text-[18px] sm:text-[24px] text-cyan-700 overflow-scroll"
            >
              Mentor
            </div>

            <div
              id="interview-Image"
              className="flex self-center w-[90%] border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-1 overflow-scroll"
            >
              <img src={Mentor} alt="" className="w-full" />
            </div>

            <div className="flex flex-col w-[90%] self-center mt-1">
              <TextToVoiceOpenAI />
            </div>
            <div
              id="title-interview-text"
              className="flex flex-row flex-wrap self-center w-[90%] px-2 mt-1 sm:mt-2 font-bold text-[18px] sm:text-[24px] text-cyan-700 overflow-scroll"
            >
              Interview Text
            </div>
            <div
              id="interview-text"
              className="flex self-center w-[90%] h-60 sm:h-80 border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-2 text-[14px] leading-[18px] sm:leading-[28px] sm:text-[24px] overflow-scroll"
            >
              {chosenInterview.interviewtext.value}
            </div>
            <div
              id="title-interview-categories"
              className="flex flex-row flex-wrap self-center w-[90%] px-2 mt-1 sm:mt-2 font-bold text-[18px] sm:text-[24px] text-cyan-700 overflow-scroll"
            >
              Kategorien
            </div>
            <div
              id="interview-categories"
              className="flex flex-row flex-wrap self-center w-[90%] h-40 border-4 border-l-[#336699cc] border-t-[#336699aa] border-r-[#33669966] border-b-[#33669933] bg-[#ffffff99] p-2 mt-1 gap-x-1 leading-[1.5] sm:leading-[2] overflow-scroll"
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
          <div className="flex flex-col w-3/24 sm:w-1/12 mt-6 sm:mt-10">
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
    </>
  );
}
