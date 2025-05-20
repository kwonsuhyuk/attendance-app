import { useNavigate, useParams } from "react-router-dom";
import Clock from "../employee/Clock";
import ManagerHomeBoxLayout from "./ManagerHomeBoxLayout";
import IntroGuideBox from "../employee/mainpageBox/IntroGuideBox";
import CompanyCodeCopy from "./CompanyCodeCopy";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import WorkplaceBox from "./WorkplaceBox";
import EmployeeListBox from "./EmployeeListBox";
import ManagerVacationBox from "./ManagerVacationBox";
import TodayCommuteBox from "./TodayCommuteBox";
import BasicGuideStepBox from "./BasicGuideStepBox";

const ManagerMainContent = () => {
  return (
    <div className="flex w-full flex-col gap-4 sm:py-5">
      <div className="flex w-full items-center justify-between px-2">
        <Clock />
        <CompanyCodeCopy />
      </div>
      <BasicGuideStepBox />
      {/* 금일 출퇴근 박스 */}
      <ManagerHomeBoxLayout boxName="금일 출퇴근" toNavigate="todayatt">
        <TodayCommuteBox />
      </ManagerHomeBoxLayout>
      <ManagerHomeBoxLayout boxName="휴가" toNavigate="vacationstatistic">
        <ManagerVacationBox />
      </ManagerHomeBoxLayout>
      <div className="grid w-full grid-cols-1 gap-4 sm:py-3 md:grid-cols-2">
        <ManagerHomeBoxLayout boxName="구성원" toNavigate="employeelist">
          <EmployeeListBox />
        </ManagerHomeBoxLayout>
        <ManagerHomeBoxLayout boxName="근무지 관리" toNavigate="workplacemanage">
          <WorkplaceBox />
        </ManagerHomeBoxLayout>
      </div>
    </div>
  );
};

export default ManagerMainContent;
