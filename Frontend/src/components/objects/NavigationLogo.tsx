import { Link } from "react-router";
import Logo from "./symbols/Logo";
import Logo2 from "@/assets/Logo_2.svg";

export default function NavigationLogo() {
  return (
    <div id="NavbarLogo">
      <Link to="/">
        <div className="flex">
          <div className="ml-2">
            <img src={Logo2} alt="Logo" width="30px" />
          </div>
          <div className="flex items-center text-left text-[10px] font-bold font-mono text-cyan-600 ml-2 mr-10 leading-2.5">
            Kitteltaschen
            <br />
            Mentor
          </div>
        </div>
      </Link>
    </div>
  );
}
