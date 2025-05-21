import React, { useState } from "react";
import { Building2, CalendarClock } from "lucide-react";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { IVacationRequest } from "./table/VacationColumns";
import ShowMoreButton from "../\bShowMoreButton";
import VacationChart from "./vacation/VacationChart";
import VacationDetailModal from "../common/modal/VacationDetailModal";
import SummaryCard from "./\bSummaryCard";
import { useParams } from "react-router-dom";

// const VacationRequestItem = ({ request }: { request: IVacationRequest }) => {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
//       <div className="mb-3 flex flex-col gap-0.5">
//         <span className="text-base font-semibold text-gray-900 dark:text-white">
//           <span className="mr-1">{request.requester.name}</span>
//           {request.requester.jobName && (
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               {request.requester.jobName}
//             </span>
//           )}
//         </span>
//       </div>

//       <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
//         <CalendarClock className="mr-1 h-4 w-4 text-blue-500 dark:text-blue-300" />
//         신청일:{" "}
//         <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
//           {request.requestDate}
//         </span>
//       </div>

//       <div className="text-sm text-gray-700 dark:text-gray-300">
//         <span className="font-medium">사유:</span> {request.reason}
//       </div>
//     </div>
//   );
// };

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
    <div className="flex flex-col gap-4" data-tour="manager_home-3">
      {/* 요청 목록 */}
      <SummaryCard
        title="처리되지 않은 휴가 요청 목록"
        count={allRequests.length}
        icon={CalendarClock}
        link={`/${companyCode}/vacationdetail`}
      />
      {/* 차트 섹션 */}
      <div className="hidden rounded-md border border-solid border-white-border-sub p-4 dark:border-dark-border-sub sm:block">
        <VacationChart mode="month" selectedDate={selectedDate} selectedName={null} />
      </div>
    </div>
  );
};

export default VacationRequestBox;
