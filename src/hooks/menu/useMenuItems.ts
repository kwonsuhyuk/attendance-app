import { useNavigate } from "react-router-dom";

// hooks/useMenuItems.ts
export const useMenuItems = (companyCode: string, logout: () => Promise<void>) => {
  const navigate = useNavigate();
  const MENU_ITEMS = [
    {
      title: "HOME",
      handle: () => navigate(`/${companyCode}/companymain`),
    },
    {
      title: "CALENDAR",
      handle: () => navigate(`/${companyCode}/calendar`),
    },
    {
      title: "QR SCAN",
      handle: () => navigate(`/${companyCode}/camera`),
    },
  ];

  const MIDDLE_MENU_ITEMS = [
    {
      title: "APP GUIDE",
      handle: () => navigate(`/${companyCode}/appguide`),
    },
    {
      title: "ABOUT",
      handle: () => navigate(`/${companyCode}/about`),
    },
  ];

  const SUB_MENU_ITEMS = [
    {
      title: "LOGOUT",
      handle: () => logout(),
    },
    // Fix: 메뉴바 -> 페이지로 위치 변경 예정
    // {
    //   title: darkMode ? "LIGHTMODE" : "DARKMODE",
    //   handle: () => {
    //     toggleTheme();
    //     // setOpen(false);
    //   },
    //   icon: darkMode ? <LightModeIcon /> : <DarkModeIcon />,
    // },
  ];

  return {
    menuItems: MENU_ITEMS,
    middleMenuItems: MIDDLE_MENU_ITEMS,
    subMenuItems: SUB_MENU_ITEMS,
  };
};
