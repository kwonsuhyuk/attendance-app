import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

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

interface MenuButtonConfig {
  label: string;
  path: string;
  tourStep?: string;
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

  const menuButtons: MenuButtonConfig[] = [
    { label: "HOME", path: "/companymain" },
    { label: "PEOPLE", path: "/employeelist", tourStep: "step-3" },
    { label: "CALENDAR", path: "/datecheck" },
    { label: "SETTING", path: "/setting", tourStep: "step-18" },
    { label: "ABOUT", path: "/about" },
  ];

  const getButtonVariant = (path: string) => {
    const fullPath = `/${companyCode}${path}`;
    const isActive =
      path === "/datecheck" || path === "/setting"
        ? location.pathname.includes(fullPath)
        : location.pathname === fullPath;

    return isActive ? "focusMenu" : "menu";
  };
  return (
    <div className="flex h-28 items-center">
      <img src={companyLogo} alt="회사로고" className="rounded-full w-24 h-24 mr-5" />
      <div className="grid grid-rows-2 w-full">
        <div className="flex justify-between w-full items-end pb-2 border-b border-solid border-black dark:border-gray-300">
          <div className="hidden lg:block font-black text-lg">{companyName}</div>
          <div className="flex gap-3 md:justify-between md:items-end md:w-1/3" data-tour="step-2">
            {menuButtons.map(button => (
              <Button
                key={button.label}
                variant={getButtonVariant(button.path)}
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
            <Switch checked={darkMode} onCheckedChange={toggleTheme} />
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
