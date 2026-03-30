import DesktopNavigationBar from "./DesktopNavigationBar";
import MobileNavigationBar from "./MobileNavigationBar";

export default function NavigationBar() {
  return (
    <nav className="sticky flex flex-row top-0 left-0 z-50 bg-blue-200">
      <DesktopNavigationBar />
      <MobileNavigationBar />
    </nav>
  );
}
