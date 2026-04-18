import { InfoBoxIcon } from "./InfoboxIcon";

type InfoboxProperties = {
  infotext: string;
  titelicon?: string;
  infotitel?: string;
};

export const InfoBox = (props: InfoboxProperties) => {
  const infotext = props.infotext;
  const infotitel = props.infotitel ? props.infotitel : "";
  const hastitel: boolean = props.infotitel ? true : false;
  const iconIdentifier = props.titelicon ? props.titelicon : "";

  return (
    <div
      id="login_info"
      className="h-fit w-[65%] sm:w-[65%] sm:ml-10 mt-10 bg-cyan-100 border-cyan-700 border-1 rounded-2xl ml-4  mb-2 shadow-2xl"
    >
      {hastitel ? (
        <div className="flex flex-row mb-2 px-2 pt-1">
          <InfoBoxIcon titelicon={iconIdentifier} />
          <div className="text-[16px] sm:text-[24px] font-bold text-cyan-700">
            {infotitel}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="text-[12px] sm:text-[16px] text-cyan-700 p-2">
        {infotext}
      </div>
    </div>
  );
};
