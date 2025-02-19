import { AdminMenuDesktop } from "./AdminMenuDesktop";
import { AdminMenuMobile } from "./AdminMenuMobile";
import { EmployeeMenuBar } from "./EmployeeMenuBar";
import { useMenuBar } from "@/hooks/useMenuBar";

const MenuBar = () => {
  const {
    darkMode,
    location,
    companyName,
    companyLogo,
    userType,
    companyCode,
    userName,
    userEmail,
    isDesktop,
    isDataReady,
    menuItems,
    middleMenuItems,
    subMenuItems,
    navigate,
    refreshPage,
    logout,
    toggleTheme,
  } = useMenuBar();

  if (!isDataReady) {
    return null; // 또는 로딩 컴포넌트
  }

  if (userType === "admin") {
    if (isDesktop) {
      return (
        <AdminMenuDesktop
          companyLogo={companyLogo}
          companyName={companyName}
          companyCode={companyCode}
          darkMode={darkMode}
          location={location}
          toggleTheme={toggleTheme}
          navigate={navigate}
          logout={logout}
        />
      );
    }
    return (
      <AdminMenuMobile
        companyLogo={companyLogo}
        companyName={companyName}
        darkMode={darkMode}
        logout={logout}
      />
    );
  }

  return (
    <EmployeeMenuBar
      darkMode={darkMode}
      location={location}
      companyLogo={companyLogo}
      userName={userName}
      userEmail={userEmail}
      menuItems={menuItems}
      middleMenuItems={middleMenuItems}
      subMenuItems={subMenuItems}
      refreshPage={refreshPage}
    />
  );
};

export default MenuBar;
