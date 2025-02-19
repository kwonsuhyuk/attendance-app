import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import ReplayIcon from "@mui/icons-material/Replay";

interface MenuItem {
  title: string;
  handle: () => void;
}

interface EmployeeMenuProps {
  darkMode: boolean;
  location: {
    pathname: string;
  };
  companyLogo: string;
  userName: string;
  userEmail: string;
  menuItems: MenuItem[];
  middleMenuItems: MenuItem[];
  subMenuItems: MenuItem[];
  refreshPage: () => void;
}

export const EmployeeMenuBar = ({
  darkMode,
  location,
  companyLogo,
  userName,
  userEmail,
  menuItems,
  middleMenuItems,
  subMenuItems,
  refreshPage,
}: EmployeeMenuProps) => {
  return (
    <div
      className="flex pb-3 text-xs justify-between items-center text-white-nav-text dark:text-dark-nav-text"
      style={{
        borderBottom: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
      }}
    >
      <div>
        {location.pathname.includes("companymain")
          ? "HOME"
          : location.pathname.includes("calendar")
          ? "CALENDAR"
          : location.pathname.includes("camera")
          ? "CAMERA"
          : location.pathname.includes("appguide")
          ? "GUIDE"
          : location.pathname.includes("outjobcheck")
          ? "OUTJOB"
          : "MENU"}
      </div>

      <Button
        variant="menu"
        size="icon"
        onClick={refreshPage}
        className="h-5 w-5 p-0 text-white-nav-text dark:text-dark-nav-text hover:text-white-nav-selected dark:hover:text-dark-nav-selected bg-white-bg dark:bg-dark-bg hover:bg-white"
        data-tour="step-43"
      >
        <ReplayIcon className="h-5 w-5" />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="menu"
            className="h-5 w-5 p-0 text-white-nav-text dark:text-dark-nav-text hover:text-white-nav-selected dark:hover:text-dark-nav-selected bg-white-bg dark:bg-dark-bg hover:bg-white"
            data-tour="step-31"
          >
            <SheetTitle className="text-sm">MENU</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-white-bg text-black">
          <div className="flex flex-col gap-4 pt-3">
            <div className="flex gap-3 m-3">
              <img src={companyLogo} alt="회사로고" className="rounded-full w-10 h-10" />
              <div className="pb-3">
                <h3 className="font-semibold text-lg">{userName}</h3>
                <p>{userEmail}</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-slate-400 dark:bg-slate-400" />

            <div className="flex flex-col">
              {menuItems.map(item => (
                <Button
                  key={item.title}
                  variant="menu"
                  className="w-full justify-start gap-5 h-12"
                  onClick={item.handle}
                >
                  <span className="font-semibold text-lg">{item.title}</span>
                </Button>
              ))}
            </div>

            <div className="h-[1px] w-full bg-slate-400 dark:bg-slate-400" />

            <div className="flex flex-col">
              {middleMenuItems.map(item => (
                <Button
                  key={item.title}
                  variant="menu"
                  className="w-full justify-start gap-5 h-12"
                  onClick={item.handle}
                >
                  <span>{item.title}</span>
                </Button>
              ))}
            </div>

            <div className="h-[1px] w-full bg-slate-400 dark:bg-slate-400" />

            <div>
              {subMenuItems.map(item => (
                <Button
                  key={item.title}
                  variant="menu"
                  className="gap-1 h-auto hover:bg-transparent"
                  onClick={item.handle}
                >
                  <span className="text-sm font-noto">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
