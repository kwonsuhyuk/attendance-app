import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Moon, Sun, LogOut } from "lucide-react";
import { cn } from "@/util/cn.util";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import ManagerMenuBarList from "./manager/ManagerMenuBarList";
import AppTitle from "../AppTitle";

export const ManagerMenuBar = () => {
  const { companyLogo, companyName, darkMode, toggleTheme, logout } = useMenuBar();
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      side={isMobile ? "right" : "left"}
      className="h-screen w-64 border-r border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-[#1E1E1E]"
    >
      <SidebarHeader className="flex h-16 items-center justify-center gap-2 bg-dark-bg p-4 font-bold">
        <AppTitle className="text-white" />
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto">
        <ManagerMenuBarList />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-gray-200 p-4 dark:border-gray-800">
        <Button
          variant="default"
          size="sm"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
        >
          <LogOut className="h-4 w-4" />
          <span>로그아웃</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
