import KategorieLabel from "./KategorieLabel";

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
  const problemCategories = props.solutionlist;
  const solutions = props.problemlist;
  return (
    <div
      key={"card_" + cardtext.key}
      id={"card_" + cardtext.key}
      className="flex rounded-xl border-1 border-gray-100 bg-cyan-50 shadow-[#00669999] shadow mb-1"
    >
      <div className="flex flex-col font-mono text-cyan-700 p-2 ">
        <div
          key={"cardtext_" + cardtext.key}
          id={"cardtext_" + cardtext.key}
          className="flex w-full text-[14px] sm:text-[16px]"
        >
          {cardtext.value}
        </div>
        <div
          key={"cardcategory_" + cardtext.key}
          id={"cardcategory_" + cardtext.key}
          className="flex flex-wrap gap-1 w-full"
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
