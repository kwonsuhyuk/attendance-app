import { Button } from "@/components/ui/button";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TMenuItem, TMenuItemGroup } from "@/model/index";
import { getPageTitle, mapButtonWithStyle } from "@/util/menuButtonStyle.util";

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
          className={button.buttonClassName}
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

        <DrawerContent className="bg-white-bg dark:bg-dark-bg text-black dark:text-white">
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
