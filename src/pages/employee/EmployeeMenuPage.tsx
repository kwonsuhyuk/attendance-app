import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";
import CompanyInfo from "@/components/common/CompanyInfo";
import { Megaphone, Info, BookOpenCheck, LogOut, ChevronRight, PlaneTakeoff } from "lucide-react";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import Seo from "@/components/Seo";

const EmployeeMenuPage = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();
  const { logout } = useMenuBar();
  const { companyName, companyLogo, companyIntro } = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName,
      companyLogo: state.currentCompany?.companyLogo,
      jobList: state.currentCompany?.jobList,
      companyIntro: state.currentCompany?.companyIntro,
    })),
  );

  const handleLogout = () => {
    logout();
  };

  const menuList = [
    {
      icon: <Megaphone className="h-5 w-5 text-primary" />,
      label: "회사 공지사항",
      path: `/${companyCode}/notice`,
    },
    {
      icon: <BookOpenCheck className="h-5 w-5 text-primary" />,
      label: "다운로드 가이드",
      path: `/${companyCode}/appguide`,
    },

    {
      icon: <Info className="h-5 w-5 text-primary" />,
      label: "만든 사람들",
      path: `/${companyCode}/about`,
    },
  ];

  return (
    <>
      <Seo title="메뉴 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col gap-4 sm:py-5">
        {/* 회사 정보 */}
        <CompanyInfo
          companyIntro={companyIntro}
          companyLogo={companyLogo}
          companyName={companyName}
          className="shadow-sm"
        />

        {/* 메뉴 리스트 */}
        <div className="mt-4 flex flex-col divide-y rounded-md border bg-white shadow-sm dark:border-muted dark:bg-muted">
          {menuList.map((menu, idx) => (
            <div
              key={idx}
              onClick={() => navigate(menu.path)}
              className="flex cursor-pointer items-center justify-between px-4 py-4 hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                {menu.icon}
                <span className="text-sm font-medium">{menu.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
        <div
          className="mt-4 flex flex-col divide-y rounded-md border bg-white px-4 py-4 text-red-500 shadow-sm dark:border-muted dark:bg-muted"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">로그아웃</span>
          </div>
        </div>
        <PoweredByFooter />
      </div>
    </>
  );
};

export default EmployeeMenuPage;
