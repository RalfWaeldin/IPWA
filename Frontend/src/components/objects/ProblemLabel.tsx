type LabelProperties = {
  label: string;
  identifier?: string;
  istaktiv?: string;
};

export default function ProblemLabel(props: LabelProperties) {
  const labeltext: string = props.label;
  const identifier: string = props.identifier
    ? "problem_" + props.identifier
    : "problem";
  const isActive = props.istaktiv == "true" ? true : false;
  return (
    <>
      {isActive ? (
        <div
          key={"problem_" + props.identifier}
          id={"problem_" + props.identifier}
          className="flex flex-row border-1 rounded-xl border-cyan-400 shadow"
        >
          <div
            key={"labeltext_" + props.identifier}
            id={"labeltext_" + props.identifier}
            className="text-[12px] sm:text-[14px] text-[#ffffff] text-nowrap pl-2 pr-1 rounded-l-xl bg-cyan-700"
          >
            {labeltext}
          </div>
          <div
            key={"removemarker_" + props.identifier}
            id={"removemarker_" + props.identifier}
            className="text-[12px] font-bold w-full border-l-2 border-cyan-400 px-1 rounded-r-2xl bg-white"
          >
            -
          </div>
        </div>
      ) : (
        <div
          id={identifier}
          key={identifier}
          className="flex flex-row px-2 w-fit rounded-xl border-1 border-cyan-200  bg-cyan-700 shadow"
        >
          <div
            key={"labeltext_" + props.identifier}
            id={"labeltext_" + props.identifier}
            className="text-[12px] sm:text-[14px] text-[#ffffff] text-nowrap px-1"
          >
            {labeltext}
          </div>
        </div>
      )}
    </>
  );
}
