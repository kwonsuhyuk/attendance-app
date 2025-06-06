import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import { cn } from "@/util/cn.util";
import { useNavigate } from "react-router-dom";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { useSidebar } from "@/components/ui/sidebar";

interface ManagerMenuItemProps {
  section: {
    label: string;
    icon?: any;
    path?: string;
    highlight?: boolean;
    children?: { label: string; path: string; dotColor?: string }[];
  };
}

const ManagerMenuBarItem = ({ section }: ManagerMenuItemProps) => {
  const { companyCode, location, expandedSections, toggleSection } = useMenuBar();
  const {
    requests: { pendingCount },
  } = useVacationRequests();
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavigation = (path: string) => {
    navigate(`/${companyCode ?? ""}${path}`);
    if (isMobile) setOpenMobile(false);
  };

  return (
    // 하위 메뉴가 있는 경우
    <div className="py-2">
      {section.children ? (
        <>
          <div
            className="flex cursor-pointer items-center justify-between rounded-md px-5 py-2 text-gray-700 hover:bg-gray-100 dark:text-dark-text dark:hover:bg-dark-border"
            onClick={() => toggleSection(section.label)}
          >
            <div className="flex items-center gap-2">
              {section.icon && <section.icon className="h-5 w-5" />}
              <div className="flex items-center gap-1">
                <span className="text-base">{section.label}</span>
                {section.label === "휴가" && pendingCount > 0 && (
                  <span className="inline-flex h-[18px] min-w-[16px] items-center justify-center rounded-[9px] bg-red-500 px-1.5 text-[11px] font-semibold leading-none text-white">
                    {pendingCount}
                  </span>
                )}
              </div>
            </div>

            {expandedSections[section.label] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>

          {expandedSections[section.label] && (
            <div className="ml-3 mr-3 mt-1 space-y-1">
              {section.children.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={location.pathname === `/${companyCode}${item.path}`}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:text-dark-border dark:hover:bg-dark-border",
                      location.pathname === `/${companyCode}${item.path}` &&
                        "font-medium text-gray-900",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.label === "휴가 등록/요청" && pendingCount > 0 && (
                        <span className="inline-flex h-[18px] min-w-[16px] items-center justify-center rounded-[9px] bg-red-500 px-1.5 text-[11px] font-semibold leading-none text-white">
                          {pendingCount}
                        </span>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          )}
        </>
      ) : (
        // 단일 메뉴 항목인 경우
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === `/${companyCode}${section.path}`}
            // ts에 undefined가 아니라는 것을 보장하는 부분
            onClick={() => handleNavigation(section.path ?? "")}
            className={cn(
              "rounded-md px-5 py-6 text-gray-700 hover:bg-gray-200 dark:text-dark-text dark:hover:bg-dark-border",
              section.label === "홈" && "text-lg",
              section.label === "공지사항" && "text-base",
              section.label === "정산" && "text-base",
            )}
          >
            <div className="flex items-center gap-2">
              {section.icon && <section.icon className="h-5 w-5" />}
              <span>{section.label}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </div>
  );
};

export default ManagerMenuBarItem;
