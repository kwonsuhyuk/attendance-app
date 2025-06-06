import CompanySummaryInfo from "../common/CompanySummaryInfo";
import IntroGuideBox from "./mainpageBox/IntroGuideBox";
import CommuteBox from "./mainpageBox/CommuteBox";
import NoticeBox from "./mainpageBox/NoticeBox";
import CommuteHistoryBox from "./mainpageBox/CommuteHistoryBox";
import VacationBox from "./mainpageBox/VacationBox";
import { useTour } from "@/hooks/use-tour";
import { employeeHomeTourSteps } from "@/constants/employeeTourSteps";

const EmployeeMainContent = () => {
  useTour("employee_home", employeeHomeTourSteps);
  return (
    <div className="flex w-full flex-col gap-4 sm:py-5">
      {/* 서비스 이용 가이드 바로가기 */}
      <IntroGuideBox />
      {/* 회사 정보 */}
      <CompanySummaryInfo type="employee" className="mx-0 my-0 shadow-md" />
      {/* 공지사항 박스 */}
      <NoticeBox />
      {/* 출근 하기 버튼 */}
      <CommuteBox />
      {/* 이번주 출퇴근 현황 */}
      <CommuteHistoryBox />
      {/* 휴가 요청/승인 내역 */}
      <VacationBox />
    </div>
  );
};

export default EmployeeMainContent;
