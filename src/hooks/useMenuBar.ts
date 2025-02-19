import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import useDarkMode from "@/store/darkmode.store";
import { useShallow } from "zustand/shallow";

export const useMenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { darkMode, toggleMode } = useDarkMode(
    useShallow(state => ({
      darkMode: state.darkMode,
      toggleMode: state.toggleMode,
    })),
  );

  const { companyName, companyLogo } = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName || "",
      companyLogo: state.currentCompany?.companyLogo || "",
    })),
  );

  const { userType, companyCode, userName, userEmail } = useUserStore(
    useShallow(state => ({
      userType: state.userType,
      companyCode: state.currentUser?.companyCode || "",
      userName: state.currentUser?.name || "",
      userEmail: state.currentUser?.email || "",
    })),
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
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

  const middleMenuItems = [
    {
      title: "APP GUIDE",
      handle: () => navigate(`/${companyCode}/appguide`),
    },
    {
      title: "ABOUT",
      handle: () => navigate(`/${companyCode}/about`),
    },
  ];

  const subMenuItems = [
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

  const refreshPage = () => {
    window.location.reload();
  };

  const logout = async () => {
    await signOut(getAuth());
    navigate("/");
  };

  const toggleTheme = () => {
    toggleMode();
  };

  const isDataReady = Boolean(companyCode && userType);
  const isDesktop = windowWidth > 600;

  return {
    // 상태
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

    // 메뉴 아이템들
    menuItems,
    middleMenuItems,
    subMenuItems,

    // 함수들
    navigate,
    refreshPage,
    logout,
    toggleTheme,
  };
};
