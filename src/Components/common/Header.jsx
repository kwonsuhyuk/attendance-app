import { SidebarTrigger } from "../ui/sidebar";
import DarkmodeSwitch from "./DarkmodeSwitch";
import NavTitle from "./NavTitle";

export default function Header() {
  return (
    <div className="flex min-h-16 w-full items-center justify-between bg-dark-bg px-4">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
        <NavTitle />
      </div>
      <DarkmodeSwitch />
    </div>
  );
}
