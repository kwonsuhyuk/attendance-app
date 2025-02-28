import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Moon, Sun, LogOut } from "lucide-react";
import { cn } from "@/util/cn.util";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import ManagerMenuBarList from "./manager/ManagerMenuBarList";

export const ManagerMenuBar = () => {
  const { companyLogo, companyName, darkMode, toggleTheme, logout } = useMenuBar();

  return (
    <SidebarProvider>
      <Sidebar className="h-screen w-64 border-r border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-[#1E1E1E]">
        <SidebarHeader className="border-b border-gray-200 p-5 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-700">
                <img src={companyLogo} alt="회사로고" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-gray-800 dark:text-gray-200">
                  {companyName}
                </div>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleTheme}>
              <Sun
                className={cn("absolute text-orange-400 opacity-0", "opacity-100 dark:opacity-0")}
                size={18}
              />
              <Moon
                className={cn("absolute text-white opacity-0", "opacity-0 dark:opacity-100")}
                size={18}
              />
            </Switch>
          </div>
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
    </SidebarProvider>
  );
};
