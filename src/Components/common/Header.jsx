import { SidebarTrigger } from "../ui/sidebar";
import DarkmodeSwitch from "./DarkmodeSwitch";
import NavTitle from "./NavTitle";

export default function Header() {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between bg-dark-bg px-4 shadow-md">
      <DarkmodeSwitch className="md:-order-first" />
      <div className="flex items-center gap-5">
        <NavTitle />
        <SidebarTrigger className="md:order-first" />
      </div>
    </div>
  );
}
