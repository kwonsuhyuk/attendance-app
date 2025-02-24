import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ADMIN_MENU_BUTTONS } from "@/constant/menuConfig";
import { getButtonVariant } from "@/util/menuUtils";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminMenuProps {
  companyLogo: string;
  companyName: string;
  companyCode: string;
  darkMode: boolean;
  location: {
    pathname: string;
  };
  toggleTheme: () => void;
  logout: () => void;
}

export const AdminMenuDesktop = ({
  companyLogo,
  companyName,
  companyCode,
  darkMode,
  location,
  toggleTheme,
  logout,
}: AdminMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-28 items-center">
      <img src={companyLogo} alt="회사로고" className="rounded-full w-24 h-24 mr-5" />
      <div className="grid grid-rows-2 w-full">
        <div className="flex justify-between w-full items-end pb-2 border-b border-solid border-black dark:border-gray-300">
          <div className="hidden lg:block font-black text-lg">{companyName}</div>
          <div className="flex gap-3 md:justify-between md:items-end md:w-1/3" data-tour="step-2">
            {ADMIN_MENU_BUTTONS.map(button => (
              <Button
                key={button.label}
                variant={getButtonVariant({
                  path: button.path,
                  companyCode,
                  currentPath: location.pathname,
                })}
                onClick={() => navigate(`/${companyCode}${button.path}`)}
                data-tour={button.tourStep}
                className="dark:text-gray-400"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Switch checked={darkMode} onCheckedChange={toggleTheme}>
              <Sun
                className={cn("absolute text-orange-400 opacity-0", "dark:opacity-0 opacity-100")}
                size={22}
              />
              <Moon
                className={cn("absolute text-white opacity-0", "dark:opacity-100 opacity-0")}
                size={22}
              />
            </Switch>

          </div>
          <Button
            variant="menu"
            size="sm"
            onClick={logout}
            className="dark:text-gray-400 px-5 pt-1"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
