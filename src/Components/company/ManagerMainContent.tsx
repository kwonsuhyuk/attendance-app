import { useNavigate, useParams } from "react-router-dom";
import Clock from "../employee/Clock";
import ManagerHomeBoxLayout from "./ManagerHomeBoxLayout";
import CompanyCodeCopy from "./CompanyCodeCopy";
import WorkplaceBox from "./WorkplaceBox";
import EmployeeListBox from "./EmployeeListBox";
import ManagerVacationBox from "./ManagerVacationBox";
import { TodayCommuteBox } from "./TodayCommuteBox";
import BasicGuideStepBox from "./BasicGuideStepBox";
import { useTour } from "@/hooks/use-tour";
import { homeSteps } from "@/constants/managerTourSteps";
import { Button } from "../ui/button";

const ManagerMainContent = () => {
  const navigate = useNavigate();
  useTour("manager_home", homeSteps);

  return (
    <div className="flex w-full flex-col gap-4 sm:py-5">
      <div className="flex w-full items-center justify-between px-2">
        <Clock />
        <CompanyCodeCopy />
      </div>
      <BasicGuideStepBox />
      {/* 금일 출퇴근 박스 */}
      <ManagerHomeBoxLayout
        boxName="금일 출퇴근"
        toNavigate="todayatt"
        guideProps={
          <>
            <Button
              variant="outline"
              className="h-7 px-2 text-[11px]"
              onClick={() => navigate("/commuteguide")}
            >
              직원 출퇴근 안내
            </Button>
            <Button
              variant="outline"
              className="h-7 px-2 text-[11px]"
              onClick={() => navigate("/outworkguide")}
            >
              외근 수락 안내
            </Button>
          </>
        }
      >
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
