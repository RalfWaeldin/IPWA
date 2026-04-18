import type { MouseEventHandler } from "react";
import KategorieLabel from "./KategorieLabel";
import { useRequestDbContext } from "@/context";

type keyValuePair = {
  key: string;
  value: string;
};

type ResultProperties = {
  resultText: keyValuePair;
  solutionlist: keyValuePair[];
  problemlist: keyValuePair[];
};

export default function ResultCard(props: ResultProperties) {
  const cardtext: keyValuePair = props.resultText;
  const problemCategories = props.problemlist;
  const solutions = props.solutionlist;
  const {
    showInterviewDetails,
    setShowInterviewDetails,
    displayData,
    setChosenInterview,
  } = useRequestDbContext();

  console.log(
    `==========================RESULTCARD==================================`,
  );
  //console.log("problemCategories", problemCategories);
  //console.log("solutions", solutions);

  const handleFullInterview: MouseEventHandler<HTMLDivElement> = async (e) => {
    console.log("Show Interview Details:", showInterviewDetails);
    const card = e.target as HTMLDivElement;
    const cardidentifier = card.id;
    const id = cardidentifier.split("_")[1];

    console.log("Chosen Display Data:", displayData);
    const interviewdata = displayData.find(
      (data) => data.interviewtext.key == id,
    ) as SingleInterviewDataType;

    console.log("Chosen Interview Data:", interviewdata);
    setChosenInterview(interviewdata);
    setShowInterviewDetails(true);
  };

  return (
    <div
      key={"card_" + cardtext.key}
      id={"card_" + cardtext.key}
      onClick={handleFullInterview}
      className="flex rounded-xl border-1 border-gray-100 bg-cyan-50 shadow-[#00669999] shadow mb-4"
    >
      <div className="flex flex-col font-mono text-cyan-700 p-2">
        <div
          key={"cardtext_" + cardtext.key}
          id={"cardtext_" + cardtext.key}
          className="flex w-full text-[12px] sm:text-[16px] mb-4"
        >
          {cardtext.value}
        </div>
        <div
          key={"cardcategory_" + cardtext.key}
          id={"cardcategory_" + cardtext.key}
          className="flex flex-col flex-wrap gap-1 w-full"
        >
          {problemCategories.map((problem) => (
            <KategorieLabel
              label={problem.value}
              istProblem="true"
              identifier={problem.key}
            />
          ))}
          {solutions.map((solution) => (
            <KategorieLabel label={solution.value} identifier={solution.key} />
          ))}
        </div>
      </div>
    </div>
  );
}
