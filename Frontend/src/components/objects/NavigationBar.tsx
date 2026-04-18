import DesktopNavigationBar from "./DesktopNavigationBar";
import MobileNavigationBar from "./MobileNavigationBar";

export default function NavigationBar() {
  return (
    <nav className="flex w-full">
      <div className="flex w-full bg-[#ecfeffeb] shadow shadow-[#66ddff99] rounded-t-md">
        <DesktopNavigationBar />
        <MobileNavigationBar />
      </div>
    </nav>
  );
}
