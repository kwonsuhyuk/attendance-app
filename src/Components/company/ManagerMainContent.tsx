import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";

const ManagerMainContent = () => {
  const navigate = useNavigate();
  const { companyCode } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
    })),
  );

  return (
    <div
      data-tour="step-1"
      className="flex h-[calc(100vh_-_18rem)] items-center justify-center border-b border-white-border bg-white-bg text-white-text dark:border-dark-border dark:bg-dark-bg dark:text-dark-text"
    >
      <div className="relative flex h-full w-full items-center">
        <div className="absolute left-[30%] top-[10%] flex cursor-pointer flex-col items-center justify-center gap-7">
          <div
            className="h-80 w-80 rounded-full bg-gradient-to-b from-black to-transparent"
            onClick={() => navigate(`/${companyCode}/employeelist`)}
          ></div>
          <div className="text-lg font-black">PEOPLE</div>
          <div className="text-xs font-normal">직원 리스트와 요약 보기 및 정산</div>

          <div className="z-9 absolute left-[65%] flex cursor-pointer flex-col items-center justify-center gap-7">
            <div
              className="h-80 w-80 rounded-full bg-[#B8B8B84D]"
              onClick={() => navigate(`/${companyCode}/datecheck`)}
            ></div>
            <div className="text-lg font-black">CALENDAR</div>
            <div className="text-xs font-normal">직원 달력 별 보기</div>

            <div
              className="absolute left-[65%] z-10 flex cursor-pointer flex-col items-center justify-center gap-7"
              onClick={() => navigate(`/${companyCode}/setting`)}
            >
              <div className="h-80 w-80 rounded-full bg-gradient-to-b from-gray-300 to-transparent"></div>
              <div className="text-lg font-black">SETTING</div>
              <div className="text-xs font-normal">공휴일 설정 및 근태 관리</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerMainContent;
