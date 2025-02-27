import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ADMIN_MENU_BUTTONS } from "@/constants/menuConfig";
import { getButtonVariant } from "@/util/menuBar.util";
import {
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  LogOut,
  Home,
  Clock,
  Calendar,
  Users,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "@/util/cn.util";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface AdminMenuProps {
  companyLogo: string;
  companyName: string;
  companyCode: string;
  darkMode: boolean;
  location: {
    pathname: string;
  };
  toggleTheme: () => void;
  logout: () => void;
}

// menuConfig 폴더에 상수화 처리 예정
const MENU_STRUCTURE = [
  {
    label: "홈",
    icon: Home,
    path: "/companymain",
    highlight: true,
  },
  {
    label: "출퇴근 및 방문",
    icon: Clock,
    children: [
      { label: "캘린더", path: "/attendance/datecheck", dotColor: "#6366f1" },
      { label: "출퇴근", path: "/todayatt"},
      { label: "기간 출퇴근 현황", path: "/perirodatt" },
    ],
  },
  {
    label: "휴가",
    icon: Calendar,
    children: [
      { label: "휴가 등록", path: "/vacationregister" },
      { label: "휴가 요청", path: "/vacationapproved" },
      { label: "휴가 내역", path: "/vacationlist" },
    ],
  },
  {
    label: "관리",
    icon: Users,
    children: [
      { label: "직원 리스트", path: "/employeelist", dotColor: "#6366f1" },
      { label: "직원 관리", path: "/employeemanage"},
      { label: "직무 관리", path: "/positionmanage" },
      { label: "근무지 관리", path: "/workplacemanage" },
    ],
  },
  {
    label: "공지",
    icon: Bell,
    children: [
      { label: "공지사항", path: "/notice/list" },
      { label: "공지 작성", path: "/notice/create" },
    ],
  },
  {
    label: "설정",
    icon: Settings,
    path: "/setting",
  },
];

export const AdminMenuDesktop = ({
  companyLogo,
  companyName,
  companyCode,
  darkMode,
  location,
  toggleTheme,
  logout,
}: AdminMenuProps) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "출퇴근 및 방문": true, // 기본적으로 열려있는 섹션
    관리: true, // 기본적으로 열려있는 섹션
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(`/${companyCode}${path}`);
  };

  return (
    <SidebarProvider>
      <Sidebar className="h-screen w-64 border-r border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-[#1E1E1E]">
        {/* 사이드바 상단 회사 정보 */}
        <SidebarHeader className="border-b border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-700">
                <img src={companyLogo} alt="회사로고" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">{companyName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{companyCode}</div>
              </div>
            </div>

            {/* 다크모드 스위치 */}
            <Switch checked={darkMode} onCheckedChange={toggleTheme}>
              <Sun
                className={cn("absolute text-orange-400 opacity-0", "opacity-100 dark:opacity-0")}
                size={18}
              />
              <Moon
                className={cn("absolute text-white opacity-0", "opacity-0 dark:opacity-100")}
                size={18}
              />
            </Switch>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          <SidebarMenu>
            {MENU_STRUCTURE.map(section => (
              <div key={section.label} className="mb-1">
                {section.children ? (
                  // 하위 메뉴가 있는 경우
                  <>
                    <div
                      className="mx-1 flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => toggleSection(section.label)}
                    >
                      <div className="flex items-center gap-2">
                        {section.icon && <section.icon className="h-5 w-5" />}
                        <span className="font-medium">{section.label}</span>
                      </div>
                      {expandedSections[section.label] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>

                    {expandedSections[section.label] && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.children.map(item => (
                          <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                              isActive={location.pathname === `/${companyCode}${item.path}`}
                              onClick={() => handleNavigation(item.path)}
                              className={cn(
                                "rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800",
                                location.pathname === `/${companyCode}${item.path}` &&
                                  "bg-gray-200 font-medium text-gray-900 dark:bg-gray-800 dark:text-white",
                              )}
                            >
                              <div className="flex items-center">
                                {item.dotColor && (
                                  <span
                                    className="mr-2 h-2 w-2 rounded-full"
                                    style={{ backgroundColor: item.dotColor }}
                                  />
                                )}
                                <span>{item.label}</span>
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // 단일 메뉴 항목인 경우 (홈)
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={location.pathname === `/${companyCode}${section.path}`}
                      onClick={() => handleNavigation(section.path)}
                      className={cn(
                        section.highlight
                          ? "mx-1 my-1 rounded-md border-0 bg-white px-4 py-2 font-medium text-gray-900 shadow-none dark:bg-gray-700 dark:text-white"
                          : "rounded-md border-0 px-4 py-2 text-gray-700 shadow-none hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800",
                        location.pathname === `/${companyCode}${section.path}` &&
                          "bg-gray-300 dark:bg-gray-600",
                      )}
                      variant="outline"
                    >
                      <div className="flex items-center gap-2">
                        {section.icon && <section.icon className="h-5 w-5" />}
                        <span>{section.label}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* 로그아웃 버튼이 있는 푸터 */}
        <SidebarFooter className="mt-auto border-t border-gray-200 p-4 dark:border-gray-800">
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
          >
            <LogOut className="h-4 w-4" />
            <span>로그아웃</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
