import NavigationLogo from "./NavigationLogo";
import NavigationLinks from "./NavigationLinks";
import NavigationUserStatus from "./NavigationUserStatus";

export default function DesktopNavigationBar() {
  return (
    <div className="hidden sm:flex p-2 gap-4 w-full place-content-between">
      <NavigationLogo />
      <NavigationLinks />
      <NavigationUserStatus />
    </div>
  );
}
