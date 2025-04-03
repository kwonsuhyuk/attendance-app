import React, { useState } from "react";
import { TVacationRequest } from "@/model/types/vacation.type";
import EmployeeVacationDetailModal from "@/components/common/modal/EmployeeVacationDetailModal";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarDays, TreePalm } from "lucide-react";
import { VACATION_STATUS_CLASSES } from "@/constants/\bvacation";

interface Props {
  request: TVacationRequest;
  label: string;
  start: string;
  end: string;
  isSameDay: boolean;
}

const EmployeeVacationItem = ({ request, label, start, end, isSameDay }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const createdAt = format(new Date(request.createdAt), "yyyy년 M월 d일 (E) HH:mm", {
    locale: ko,
  });

  const badgeStatusClass = VACATION_STATUS_CLASSES[label];

  return (
    <>
      <div
        className="group flex cursor-pointer flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm transition hover:bg-accent dark:border-gray-700 dark:bg-dark-card-bg"
        onClick={e => {
          e.stopPropagation();
          setModalOpen(true);
        }}
      >
        {/* 상단: 휴가 종류 + 상태 */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <TreePalm /> {request.vacationType}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeStatusClass}`}
          >
            {label}
          </span>
        </div>

        {/* 날짜 정보 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {isSameDay ? start : `${start} ~ ${end}`}
          </span>
        </div>

        {/* 사유 */}
        <div className="line-clamp-1 text-xs text-muted-foreground">{request.reason}</div>

        {/* 요청일 */}
        <div className="text-right text-[11px] text-gray-400 dark:text-gray-500">
          {createdAt} 요청
        </div>
      </div>

      <EmployeeVacationDetailModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        request={request}
        start={start}
        end={end}
        isSameDay={isSameDay}
        label={label}
      />
    </>
  );
};

export default EmployeeVacationItem;
