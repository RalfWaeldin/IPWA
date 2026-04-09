import NavigationLogo from "./NavigationLogo";
import NavigationUserStatus from "./NavigationUserStatus";
import MobileHamburgerMenu from "./MobileHamburgerMenu";

export default function MobileNavigationBar() {
  return (
    <div className="sm:hidden flex pt-1 gap-4 w-full place-content-between">
      <NavigationLogo />
      <div className="flex flex-row gap-2">
        <NavigationUserStatus />
        <MobileHamburgerMenu />
      </div>
    </div>
  );
}
