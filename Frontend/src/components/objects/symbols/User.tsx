type UserColors = {
  border: string;
  icon: string;
};

type UserIconProperties = {
  width: string;
  height: string;
  innersize: string;
  colors: UserColors;
};

export default function UserIcon(props: UserIconProperties) {
  const colors: UserColors = props.colors;
  const innersize: string = props.innersize;
  const outerwidth: string = props.width;
  const outerheight: string = props.height;
  const viewboxCoords = `0 0 115 115`;
  const calculatedstrokewidth = (Number.parseInt(innersize) / 10).toString();
  return (
    <>
      <svg
        width={outerwidth}
        height={outerheight}
        viewBox={viewboxCoords}
        version="1.1"
        id="svg1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-4.113636,-3.8491745)">
          <circle
            style={{
              fill: "None",
              stroke: colors.border,
              strokeWidth: calculatedstrokewidth,
            }}
            id="path1"
            cx="60.363636"
            cy="60.099174"
            r="55"
          />

          <path
            id="path2"
            style={{ fill: colors.icon, stroke: "None" }}
            d="m 60,25.263672 a 15,15 0 0 0 -15,15 15,15 0 0 0 15,15 15,15 0 0 0 15,-15 15,15 0 0 0 -15,-15 z m 0,32.86914 a 30,10 0 0 0 -30,10 30,10 0 0 0 0.0332,0.476563 C 30.010692,68.802677 30,68.999681 30,69.199219 v 20 c 0,2.77 2.23,5 5,5 h 50 c 2.77,0 5,-2.23 5,-5 v -20 c 0,-0.199538 -0.01069,-0.396542 -0.0332,-0.589844 A 30,10 0 0 0 90,68.132812 a 30,10 0 0 0 -30,-10 z"
          />
        </g>
      </svg>
    </>
  );
}
