type LabelProperties = {
  label: string;
  identifier?: string;
  istaktiv?: string;
};

export default function SolutionLabel(props: LabelProperties) {
  const labeltext: string = props.label;
  const identifier: string = props.identifier
    ? "solution_" + props.identifier
    : "solution";
  const isActive = props.istaktiv == "true" ? true : false;
  return (
    <>
      {isActive ? (
        <div
          key={"solution_" + props.identifier}
          id={"solution_" + props.identifier}
          className="flex flex-row border-1 rounded-xl border-cyan-700 shadow"
        >
          <div
            key={"labeltext_" + props.identifier}
            id={"labeltext_" + props.identifier}
            className="text-[12px] sm:text-[14px] text-cyan-700 text-nowrap pl-2 pr-1 rounded-l-xl bg-cyan-100"
          >
            {labeltext}
          </div>
          <div
            key={"removemarker_" + props.identifier}
            id={"removemarker_" + props.identifier}
            className="text-[12px] font-bold w-full border-l-2 border-cyan-700 px-1 rounded-r-2xl bg-white"
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
