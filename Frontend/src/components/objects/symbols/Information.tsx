type IconColors = {
  I: string;
  Filling: string;
  Border: string;
};

type IconProperties = {
  width: string;
  height: string;
  colors: IconColors;
};

export default function Information(props: IconProperties) {
  const colors: IconColors = props.colors;
  const iconwidth: string = props.width;
  const iconheight: string = props.height;
  return (
    <>
      <svg
        width={iconwidth}
        height={iconheight}
        viewBox="0 0 32 32"
        version="1.1"
        id="svg1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1">
          <circle
            style={{
              fill: colors.Border ? colors.Border : "#501616",
              stroke: "none",
            }}
            id="path4"
            cx="16"
            cy="16"
            r="15"
          />
          <circle
            style={{
              fill: colors.Filling ? colors.Filling : "#ffd42a",
              stroke: "none",
            }}
            id="path8"
            cx="16"
            cy="16"
            r="13"
          />
          <g id="g9">
            <rect
              style={{
                fill: colors.I ? colors.I : "#782121",
                stroke: "none",
              }}
              id="rect8"
              width="5"
              height="12"
              x="13.5"
              y="13.356474"
              rx="1.5"
              ry="2"
            />
            <circle
              style={{
                fill: colors.I ? colors.I : "#782121",
                stroke: "none",
              }}
              id="path9"
              cx="16"
              cy="9.5834713"
              r="2.5"
            />
          </g>
        </g>
      </svg>
    </>
  );
}
