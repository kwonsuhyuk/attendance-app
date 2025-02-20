import { AdminMenuDesktop } from "./AdminMenuDesktop";
import { AdminMenuMobile } from "./AdminMenuMobile";
import { EmployeeMenuBar } from "./EmployeeMenuBar";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import { TMenuItems } from "@/model/index";

interface IUserInfo {
  companyName: string;
  companyLogo: string;
  companyCode: string;
  userName: string;
  userEmail: string;
}

interface IMenuActions {
  refreshPage: () => void;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

interface IMenuState extends IUserInfo, TMenuItems, IMenuActions {
  darkMode: boolean;
  location: {
    pathname: string;
  };
}

const MenuBar = () => {
  const menuBar = useMenuBar();
  const { userType, isDesktop, ...menuState } = menuBar as IMenuState & {
    userType: "admin" | "employee";
    isDesktop: boolean;
  };

  if (userType === "admin") {
    if (isDesktop) {
      return <AdminMenuDesktop {...menuState} />;
    }
    return (
      <AdminMenuMobile
        companyLogo={menuState.companyLogo}
        companyName={menuState.companyName}
        darkMode={menuState.darkMode}
        logout={menuState.logout}
      />
    );
  }

  return <EmployeeMenuBar {...menuState} />;
};

export default MenuBar;
