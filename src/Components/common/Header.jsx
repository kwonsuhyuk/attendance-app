import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <div className="flex h-16 w-full items-center bg-dark-bg">
      <SidebarTrigger />
    </div>
  );
}
