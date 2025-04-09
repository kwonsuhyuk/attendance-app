import { useNavigate, useParams } from "react-router-dom";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";
import CompanyInfo from "@/components/common/CompanyInfo";
import { LogOut, ChevronRight } from "lucide-react";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import { useMenuBar } from "@/hooks/menu/useMenuBar";
import { EMPLOYEE_SUB_MENUS } from "@/constants/menuConfig";

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

  return (
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
  );
};

export default EmployeeMenuPage;
