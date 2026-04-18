import bulb from "@/assets/bulb.svg";
import team from "@/assets/team.png";

type InfoboxIconProperties = {
  titelicon?: string;
};

export const InfoBoxIcon = (props: InfoboxIconProperties) => {
  const iconIdentifier = props.titelicon ? props.titelicon : "";
  const hasicon: boolean = props.titelicon ? true : false;
  let icon = bulb;
  switch (iconIdentifier) {
    case "bulb":
      icon = bulb;
    case "team":
      icon = team;
  }
  return (
    <>
      {hasicon ? (
        <div className="mr-2">
          <img src={icon} alt="Frage" className="w-4 sm:w-6" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
