import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

import { useMenuBar } from "@/hooks/menu/useMenuBar";
import ManagerMenuBarList from "./manager/ManagerMenuBarList";
import AppTitle from "../AppTitle";
import { useCompanyStore } from "@/store/company.store";

export const ManagerMenuBar = () => {
  const { logout } = useMenuBar();
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      side={isMobile ? "right" : "left"}
      className="h-screen w-64 border-r border-gray-200 bg-white-bg dark:border-gray-100 dark:bg-dark-bg"
    >
      <SidebarHeader className="flex h-16 items-center justify-center gap-2 border-solid border-dark-border bg-dark-card-bg p-4 font-bold dark:bg-dark-bg">
        <AppTitle className="text-white" />
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto dark:bg-dark-bg">
        <ManagerMenuBarList />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-gray-200 p-4 dark:border-gray-800 dark:bg-dark-bg">
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
