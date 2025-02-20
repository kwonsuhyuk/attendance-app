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
        <div
          className="flex justify-between w-full items-end pb-2"
          style={{
            borderBottom: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
          }}
        >
          <div className="hidden lg:block font-black text-lg">{companyName}</div>
          <div className="flex gap-3 md:justify-between md:items-end md:w-1/3" data-tour="step-2">
            <Button
              variant={location.pathname === `/${companyCode}/companymain` ? "focusMenu" : "menu"}
              onClick={() => navigate(`/${companyCode}/companymain`)}
              className="dark:text-gray-400"
            >
              HOME
            </Button>
            <Button
              variant={location.pathname === `/${companyCode}/employeelist` ? "focusMenu" : "menu"}
              onClick={() => navigate(`/${companyCode}/employeelist`)}
              data-tour="step-3"
              className="dark:text-gray-400"
            >
              PEOPLE
            </Button>
            <Button
              variant={
                location.pathname.includes(`/${companyCode}/datecheck`) ? "focusMenu" : "menu"
              }
              onClick={() => navigate(`/${companyCode}/datecheck`)}
              className="dark:text-gray-400"
            >
              CALENDAR
            </Button>
            <Button
              variant={location.pathname.includes(`/${companyCode}/setting`) ? "focusMenu" : "menu"}
              onClick={() => navigate(`/${companyCode}/setting`)}
              data-tour="step-18"
              className="dark:text-gray-400"
            >
              SETTING
            </Button>
            <Button
              variant={location.pathname.includes(`/${companyCode}/about`) ? "focusMenu" : "menu"}
              onClick={() => navigate(`/${companyCode}/about`)}
              className="dark:text-gray-400"
            >
              ABOUT
            </Button>
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
