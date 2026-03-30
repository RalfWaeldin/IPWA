import { Link } from "react-router";
import Logo from "./symbols/Logo";

export default function NavigationLogo() {
  return (
    <div id="NavbarLogo">
      <Link to="/">
        <div className="flex">
          <div>
            <Logo
              colors={{
                I: "#7799ff",
                P: "#99ccff",
                W: "#0000ff",
                A: "#7799ff",
              }}
              width="30"
              height="30"
            />
          </div>
          <div className="flex items-center text-left text-[10px] font-bold font-mono text-indigo-600 ml-2 mr-10 leading-2.5">
            Interner
            <br />
            Pflegewissen
            <br />
            Assistent
          </div>
        </div>
      </Link>
    </div>
  );
}
