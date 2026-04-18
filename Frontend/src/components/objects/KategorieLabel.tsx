import ProblemLabel from "./ProblemLabel";
import SolutionLabel from "./SolutionLabel";

type KategorieProperties = {
  label: string;
  identifier?: string;
  istProblem?: string;
  istaktiv?: string;
};

export default function KategorieLabel(props: KategorieProperties) {
  const identifier: string = props.identifier ? props.identifier : "label";
  const isProblem = props.istProblem == "true" ? true : false;

  return isProblem ? (
    <ProblemLabel
      label={props.label}
      identifier={identifier}
      istaktiv={props.istaktiv}
    />
  ) : (
    <SolutionLabel
      label={props.label}
      identifier={identifier}
      istaktiv={props.istaktiv}
    />
  );
}
