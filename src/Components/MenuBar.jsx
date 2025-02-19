import { useLocation, useNavigate } from "react-router-dom";
import "../firebase";
import { getAuth, signOut } from "firebase/auth";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
import ReplayIcon from "@mui/icons-material/Replay";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import useDarkMode from "@/store/darkmode.store";
import { useShallow } from "zustand/shallow";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleMode } = useDarkMode(
    useShallow(state => ({
      darkMode: state.darkMode,
      toggleMode: state.toggleMode,
    })),
  );
  const companyName = useCompanyStore(state => state.currentCompany?.companyName);
  const companyLogo = useCompanyStore(state => state.currentCompany?.companyLogo);
  const userType = useUserStore(state => state.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const userName = useUserStore(state => state.currentUser?.name);
  const userEmail = useUserStore(state => state.currentUser?.email);

  const subMenuItems = [
    {
      title: "LOGOUT",
      handle: () => {
        logout();
      },
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

  const middleMenuItems = [
    {
      title: "APP GUIDE",
      handle: () => {
        navigate(`/${companyCode}/appguide`);
      },
    },
    {
      title: "ABOUT",
      handle: () => {
        navigate(`/${companyCode}/about`);
      },
    },
  ];

  const menuItems = [
    {
      title: "HOME",
      handle: () => {
        navigate(`/${companyCode}/companymain`);
      },
    },
    {
      title: "CALENDAR",
      handle: () => {
        navigate(`/${companyCode}/calendar`);
      },
    },
    {
      title: "QR SCAN",
      handle: () => {
        navigate(`/${companyCode}/camera`);
      },
    },
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

  // user가 관리자 일시
  if (userType === "admin") {
    if (window.innerWidth > 600) {
      return (
        // Main , 직원리스트 , 회사 설정, 공휴일 지정 하는 페이지 , 직원 요약 켈린더
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
              <div
                className="flex gap-3 md:justify-between md:items-end md:w-1/3"
                data-tour="step-2"
              >
                <Button
                  variant={
                    location.pathname === `/${companyCode}/companymain` ? "focusMenu" : "menu"
                  }
                  onClick={() => navigate(`/${companyCode}/companymain`)}
                  className="border-none dark:!border-none dark:bg-transparent dark:text-gray-400"
                >
                  HOME
                </Button>
                <Button
                  variant={
                    location.pathname === `/${companyCode}/employeelist` ? "focusMenu" : "menu"
                  }
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
                  variant={
                    location.pathname.includes(`/${companyCode}/setting`) ? "focusMenu" : "menu"
                  }
                  onClick={() => navigate(`/${companyCode}/setting`)}
                  data-tour="step-18"
                  className="dark:text-gray-400"
                >
                  SETTING
                </Button>
                <Button
                  variant={
                    location.pathname.includes(`/${companyCode}/about`) ? "focusMenu" : "menu"
                  }
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
    } else {
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
              <div className="font-black text-lg">{companyName}</div>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
    }
  } else {
    // user가 직원일시
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
  }
};

export default MenuBar;
