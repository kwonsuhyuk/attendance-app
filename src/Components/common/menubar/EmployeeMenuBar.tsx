import { Button } from "@/components/ui/button";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TMenuItem, TMenuItemGroup } from "@/model/types/menu.type";
import { getPageTitle, mapButtonWithStyle } from "@/util/menuButtonStyle.util";
import { twMerge } from "tailwind-merge";

interface MenuButtonConfig extends TMenuItem {
  buttonClassName?: string;
  textClassName?: string;
  tourStep?: string;
}

interface MenuButtonGroupProps {
  buttons: MenuButtonConfig[];
  setIsOpen: (open: boolean) => void;
  showDivider?: boolean;
}

interface EmployeeMenuProps extends TMenuItemGroup {
  location: {
    pathname: string;
  };
  companyLogo: string;
  userName: string;
  userEmail: string;
  refreshPage: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MenuButtonGroup = ({ buttons, setIsOpen, showDivider = true }: MenuButtonGroupProps) => (
  <>
    <div className="flex flex-col">
      {buttons.map(button => (
        <Button
          key={button.title}
          variant="menu"
          className={twMerge(button.buttonClassName, "text-black dark:text-white")}
          onClick={() => {
            button.handle();
            setIsOpen(false);
          }}
          data-tour={button.tourStep}
        >
          <span className={button.textClassName}>{button.title}</span>
        </Button>
      ))}
    </div>
    {showDivider && <div className="h-[1px] w-full bg-slate-400 dark:bg-slate-400" />}
  </>
);

export const EmployeeMenuBar = ({
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
  const mainMenuButtons = mapButtonWithStyle(menuItems, "main");
  const middleMenuButtons = mapButtonWithStyle(middleMenuItems, "middle");
  const subMenuButtons = mapButtonWithStyle(subMenuItems, "sub");

  return (
    <div className="border-black-200 flex items-center justify-between border-b border-solid pb-3 text-xs text-white-nav-text dark:border-gray-300 dark:text-dark-nav-text">
      <div>{getPageTitle(location.pathname)}</div>

      <Button
        variant="menu"
        size="icon"
        onClick={refreshPage}
        className="h-5 w-5 bg-white-bg p-0 text-white-nav-text hover:bg-white hover:text-white-nav-selected dark:bg-dark-bg dark:text-dark-nav-text dark:hover:text-dark-nav-selected"
        data-tour="step-43"
      >
        <ReplayIcon className="h-5 w-5" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="menu"
            className="h-5 w-5 p-0 text-white-nav-text hover:text-white-nav-selected dark:text-dark-nav-text dark:hover:text-dark-nav-selected"
            data-tour="step-31"
          >
            <DrawerTitle className="text-sm">MENU</DrawerTitle>
          </Button>
        </DrawerTrigger>

        <DrawerContent className="bg-white-bg text-black dark:bg-dark-bg dark:text-white">
          <DrawerHeader>
            <div className="flex flex-col gap-4">
              <div className="m-3 flex gap-3">
                <img src={companyLogo} alt="회사로고" className="h-10 w-10 rounded-full" />
                <div className="pb-3">
                  <h3 className="text-lg font-semibold">{userName}</h3>
                  <p>{userEmail}</p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-slate-400 dark:bg-slate-400" />

              <MenuButtonGroup buttons={mainMenuButtons} setIsOpen={setIsOpen} />
              <MenuButtonGroup buttons={middleMenuButtons} setIsOpen={setIsOpen} />
              <MenuButtonGroup buttons={subMenuButtons} setIsOpen={setIsOpen} showDivider={false} />
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
