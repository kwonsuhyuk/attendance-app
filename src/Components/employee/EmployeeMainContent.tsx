import { useNavigate, useMatch } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import CompanyInfoHeader from "../employee/CompanyInfoHeader";
import ShowSalary from "../employee/showSalary/ShowSalary";
import EmployeePageContainer from "../container/EmployeePageContainer";

export default function EmployeeMainContent() {
  const navigate = useNavigate();
  const { companyCode, userType } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userType: state.currentUser?.userType,
    })),
  );

  const matchCalendar = useMatch(`/${companyCode}/calendar`);
  const matchHome = useMatch(`/${companyCode}/companymain`);

  return (
    <>
      <CompanyInfoHeader />
      <div className="flex flex-col items-center gap-4">
        <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
        <div
          className="flex w-full cursor-pointer flex-row items-center justify-between text-sm"
          onClick={() => navigate(`/${companyCode}/calendar`)}
        >
          <div>캘린더 바로가기</div>
          <div>&gt;</div>
        </div>
        <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
        <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
        <div className="w-full" data-tour="step-33">
          {userType === "employee" && (
            <ShowSalary matchCalendar={matchCalendar} matchHome={matchHome} />
          )}
        </div>
        <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
        <div
          data-tour="step-34"
          className="flex cursor-pointer items-center justify-center pb-5 text-lg font-extrabold underline"
          onClick={() => navigate(`/${companyCode}/camera`)}
        >
          QR SCAN
        </div>
      </div>
    </>
  );
}
