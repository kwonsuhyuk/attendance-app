import { twMerge } from "tailwind-merge";
import { SidebarTrigger } from "../ui/sidebar";
import DarkmodeSwitch from "./DarkmodeSwitch";
import NavTitle from "./NavTitle";

interface HeaderProps {
  variant?: "employee" | "manager";
}

export default function Header({ variant = "manager" }: HeaderProps) {
  const isEmployee = variant === "employee";

  return (
    <div
      className={twMerge(
        "fixed top-0 z-50 w-full items-center justify-between border-b bg-dark-card-bg px-4 shadow-md dark:bg-dark-bg",
        "h-12 sm:h-14 md:h-16",

        isEmployee && "left-1/2 max-w-screen-sm -translate-x-1/2",
      )}
    >
      <div className="flex h-full w-full items-center justify-between">
        <DarkmodeSwitch className={variant === "manager" ? "md:-order-first" : ""} />
        <div className="flex items-center gap-5">
          <NavTitle />
          {variant === "manager" && <SidebarTrigger className="md:order-first" />}
        </div>
      </div>
    </div>
  );
}
