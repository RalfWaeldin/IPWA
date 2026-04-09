import DesktopNavigationBar from "./DesktopNavigationBar";
import MobileNavigationBar from "./MobileNavigationBar";

export default function NavigationBar() {
  return (
    <nav className="sticky flex flex-row top-0 left-0 z-50 bg-[#ecfeffeb] shadow shadow-[#66ddff99] rounded-t-md ml-[15px] mr-[15px] sm:ml-[31px] sm:mr-[31px]">
      <div className="w-full mr-2">
        <DesktopNavigationBar />
        <MobileNavigationBar />
      </div>
    </nav>
  );
}
