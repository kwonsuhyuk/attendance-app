import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ClipboardList, LogOut } from "lucide-react";

import { useMenuBar } from "@/hooks/menu/useMenuBar";
import ManagerMenuBarList from "./manager/ManagerMenuBarList";
import AppTitle from "../AppTitle";
import { Separator } from "@/components/ui/separator";
import CompanySummaryInfo from "../CompanySummaryInfo";

export const ManagerMenuBar = () => {
  const { logout } = useMenuBar();
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      side={isMobile ? "right" : "left"}
      className="h-screen w-64 border-r border-gray-200 bg-red-300 dark:border-gray-100 dark:bg-dark-bg"
    >
      <SidebarHeader className="flex h-16 items-center justify-center gap-2 border-solid border-dark-border bg-dark-card-bg p-4 font-bold dark:bg-dark-bg">
        <AppTitle className="text-white" />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto border border-b border-solid dark:bg-dark-bg">
        <CompanySummaryInfo />
        <Separator className="bg-border dark:bg-dark-border" />
        <ManagerMenuBarList />
      </SidebarContent>

      <SidebarFooter className="mt-auto space-y-3 border border-t border-solid p-4 dark:border-gray-800 dark:bg-dark-bg">
        <SidebarMenuSubButton
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center gap-2 rounded-md border border-t border-solid px-4 py-2 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <ClipboardList className="h-5 w-5 shrink-0 text-zinc-500 transition-colors duration-200 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-white" />
          <span>서비스 만족도 설문</span>
        </SidebarMenuSubButton>
        <Separator />
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 border-gray-300 text-gray-700 dark:border dark:border-solid dark:border-dark-border-sub dark:bg-dark-bg dark:text-dark-text hover:dark:bg-dark-card-bg"
        >
          <LogOut className="h-4 w-4" />
          <span>로그아웃</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
