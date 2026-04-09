import KategorieLabel from "./KategorieLabel";
import ProblemLabel from "./ProblemLabel";
import SolutionLabel from "./SolutionLabel";

type keyValuePair = {
  key: string;
  value: string;
};

type KategorieProperties = {
  collection?: keyValuePair[];
  istProblem?: string;
  istaktiv?: string;
  handleRemove: (key, event) => {};
};

const KategorieLabelList = (props: KategorieProperties) => {
  const collection = props.collection ? props.collection : [];
  const handleRemove = props.handleRemove;
  console.log("KategorieCollection", collection);

  return collection.length > 0 ? (
    collection.map((item) => (
      <div onClick={(event) => handleRemove(item.key, event)}>
        <KategorieLabel
          key={item.key}
          label={item.value}
          identifier={item.key}
          istProblem={props.istProblem}
          istaktiv={props.istaktiv}
        />
      </div>
    ))
  ) : (
    <span>Keine Auswahl</span>
  );
};

export default KategorieLabelList;
