import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { EMPLOYEE_SUB_MENUS } from "@/constants/menuConfig";

const EmployeeEtcPageTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyCode } = useParams();

  const matchedMenu = EMPLOYEE_SUB_MENUS(companyCode!).find(
    menu => location.pathname === menu.path,
  );

  return (
    <div className="fixed left-1/2 top-0 z-50 h-16 w-full max-w-screen-sm -translate-x-1/2 border-b bg-white-bg py-3 dark:bg-dark-bg sm:h-14 md:h-16">
      <div className="flex h-full items-center gap-3">
        <Button
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="bg-white-bg text-black hover:bg-white-bg hover:text-foreground dark:bg-dark-bg dark:text-white"
        >
          <ChevronLeft className="h-16 w-16" />
        </Button>

        {matchedMenu && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-base font-semibold text-black dark:text-white">
              {matchedMenu.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeEtcPageTitle;
