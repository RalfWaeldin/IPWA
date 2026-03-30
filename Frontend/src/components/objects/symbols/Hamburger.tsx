type HamburgerProperties = {
  width: string;
  height: string;
  color1?: string;
  color2?: string;
  color3?: string;
};

export default function Hamburger(props: HamburgerProperties) {
  const hamburgerwidth: string = props.width;
  const hamburgerheight: string = props.height;
  const upperbarcolor = props.color1 ? props.color1 : "#000000";
  const middlebarcolor = props.color2 ? props.color2 : upperbarcolor;
  const bottombarcolor = props.color3 ? props.color3 : upperbarcolor;
  return (
    <svg
      width={hamburgerwidth}
      height={hamburgerheight}
      viewBox="0 0 32 32"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="layer1">
        <rect
          style={{ fill: upperbarcolor }}
          id="rect1"
          width="26"
          height="4"
          x="3"
          y="3"
          rx="2"
          ry="4.1432505"
        />
        <rect
          style={{ fill: middlebarcolor }}
          id="rect1-8"
          width="26"
          height="4"
          x="3"
          y="9"
          rx="2"
          ry="4.1432505"
        />
        <rect
          style={{ fill: bottombarcolor }}
          id="rect1-8-1"
          width="26"
          height="4"
          x="3"
          y="15"
          rx="2"
          ry="4.1432505"
        />
      </g>
    </svg>
  );
}
