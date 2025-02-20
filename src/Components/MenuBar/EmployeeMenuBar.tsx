import { Button } from "@/components/ui/button";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const EmployeeMenuBar = ({
  // darkMode,
  location,
  companyLogo,
  userName,
  userEmail,
  menuItems,
  middleMenuItems,
  subMenuItems,
  refreshPage,
  isOpen,
  setIsOpen,
}: EmployeeMenuProps) => {
  const getPageTitle = (pathname: string): string => {
    switch (true) {
      case pathname.includes("companymain"):
        return "HOME";
      case pathname.includes("calendar"):
        return "CALENDAR";
      case pathname.includes("camera"):
        return "CAMERA";
      case pathname.includes("appguide"):
        return "GUIDE";
      case pathname.includes("outjobcheck"):
        return "OUTJOB";
      default:
        return "MENU";
    }
  };

  return (
    <div className="flex pb-3 text-xs justify-between items-center text-white-nav-text dark:text-dark-nav-text border-b border-solid border-black-200 dark:border-gray-300">
      <div>{getPageTitle(location.pathname)}</div>

      <Button
        variant="menu"
        size="icon"
        onClick={refreshPage}
        className="h-5 w-5 p-0 text-white-nav-text dark:text-dark-nav-text hover:text-white-nav-selected dark:hover:text-dark-nav-selected bg-white-bg dark:bg-dark-bg hover:bg-white"
        data-tour="step-43"
      >
        <ReplayIcon className="h-5 w-5" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="menu"
            className="h-5 w-5 p-0 text-white-nav-text dark:text-dark-nav-text hover:text-white-nav-selected dark:hover:text-dark-nav-selected"
            data-tour="step-31"
          >
            <DrawerTitle className="text-sm">MENU</DrawerTitle>
          </Button>
        </DrawerTrigger>

        <DrawerContent className="bg-white-bg text-black">
          <DrawerHeader>
            <div className="flex flex-col gap-4">
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
                    onClick={() => {
                      item.handle();
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      item.handle();
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      item.handle();
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-sm font-noto">{item.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
