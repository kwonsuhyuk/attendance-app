import React, { useState } from "react";
import { Building2, CalendarClock } from "lucide-react";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { IVacationRequest } from "./table/VacationColumns";
import VacationChart from "./vacation/VacationChart";
import SummaryCard from "./\bSummaryCard";
import { useParams } from "react-router-dom";

const VacationRequestBox = () => {
  const { companyCode } = useParams();
  const {
    requests: { filter: getFilteredVacationData },
  } = useVacationRequests();
  const selectedDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };
  const allRequests = getFilteredVacationData(
    "pending",
    (req: IVacationRequest) => req.status === "대기중",
  );

  return (
    <div className="flex flex-col gap-4" data-tour="manager_home-4">
      {/* 요청 목록 */}
      <SummaryCard
        title="처리되지 않은 휴가 요청 목록"
        count={allRequests.length}
        icon={CalendarClock}
        link={`/${companyCode}/manager/vacationdetail`}
      />
      {/* 차트 섹션 */}
      <div className="rounded-xl p-4 shadow-md">
        <VacationChart mode="month" selectedDate={selectedDate} selectedName={null} />
      </div>
    </div>
  );
};

export default VacationRequestBox;
