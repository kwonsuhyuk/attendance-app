import { useNavigate, useParams } from "react-router-dom";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";
import CompanyInfo from "@/components/common/CompanyInfo";
import { LogOut, ChevronRight, ClipboardList } from "lucide-react";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import Seo from "@/components/Seo";
import { EMPLOYEE_SUB_MENUS } from "@/constants/menuConfig";
import { useTour } from "@/hooks/use-tour";
import { empMenuTourSteps } from "@/constants/employeeTourSteps";

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

  useTour("employee-menu", empMenuTourSteps);

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

        <div
          className="mt-4 flex flex-col divide-y rounded-md border bg-white shadow-sm dark:border-muted dark:bg-muted"
          data-tour="guide-2"
        >
          {EMPLOYEE_SUB_MENUS(companyCode!).map((menu, idx) => (
            <div
              key={idx}
              onClick={() => navigate(menu.path)}
              className="flex cursor-pointer items-center justify-between px-4 py-4 hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                {menu.icon}
                <span className="text-sm font-medium">{menu.label}</span>
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 py-4 text-sm text-indigo-600 shadow-sm transition hover:bg-gray-100 dark:border-muted dark:bg-muted dark:text-indigo-400 dark:hover:bg-dark-card-bg"
        >
          <ClipboardList className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-medium">서비스 만족도 설문</span>
        </a>
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
