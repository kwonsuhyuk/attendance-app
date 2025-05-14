import { twMerge } from "tailwind-merge";
import { SidebarTrigger } from "../ui/sidebar";
import DarkmodeSwitch from "./DarkmodeSwitch";
import NavTitle from "./NavTitle";
import { useCompanyStore } from "@/store/company.store";
import AppTitle from "./AppTitle";
import NotificationBell from "./NotificationBell";
import { HelpCircle } from "lucide-react";
import DarkmodeToggle from "./DarkmodeToggle";


interface HeaderProps {
  variant?: "employee" | "manager";
}

export default function Header({ variant = "manager" }: HeaderProps) {
  if (variant === "manager") {
    return (
      <div className="fixed top-0 z-50 h-12 w-full border-b bg-dark-card-bg px-4 shadow-md dark:bg-dark-bg sm:h-14 md:h-16">
        <div className="flex h-full w-full items-center justify-between">
          <DarkmodeSwitch className="hidden md:-order-first md:flex" />
          <div className="text-sm text-white md:hidden">
            <AppTitle className="text-base text-white" />
          </div>
          <div className="flex items-center gap-5">
            <NavTitle />
            <SidebarTrigger className="md:order-first" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-1/2 top-0 z-50 h-12 w-full max-w-screen-sm -translate-x-1/2 border-b bg-dark-card-bg px-4 shadow-md dark:bg-dark-bg sm:h-14 md:h-16">
      <div className="flex h-full w-full items-center justify-between">
        <AppTitle className="text-base text-white" />
        <div className="flex items-center gap-5">
          {/* 추가 디자인 수정 필요 우선 header 에 넣어놓음 */}
          <button
            // onClick={() => setRunTour(true)}
            className="rounded-full text-white"
            aria-label="도움말"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        <div className="flex items-center gap-3">
          <DarkmodeToggle />
          <NotificationBell />
        </div>
      </div>
    </div>
  );
}
