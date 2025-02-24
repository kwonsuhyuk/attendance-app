import { AdminMenuDesktop } from "./AdminMenuDesktop";
import { AdminMenuMobile } from "./AdminMenuMobile";
import { EmployeeMenuBar } from "./EmployeeMenuBar";
import { useMenuBar } from "@/hooks/menu/useMenuBar";

const MenuBar = () => {
  const menuBar = useMenuBar();
  const { userType, isDesktop, ...menuState } = menuBar;

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
