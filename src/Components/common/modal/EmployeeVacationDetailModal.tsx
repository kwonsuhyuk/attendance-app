import React from "react";
import { Calendar, User, BadgeCheck, FileText, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TVacationRequest } from "@/model/types/vacation.type";
import { VACATION_STATUS_CLASSES, VACATION_TYPE_COLORS } from "@/constants/\bvacation";
import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal";

interface TEmployeeVacationDetailModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  request: TVacationRequest;
  start: string;
  end: string;
  isSameDay: boolean;
  label: string;
}

const EmployeeVacationDetailModal = ({
  modalOpen,
  setModalOpen,
  request,
  start,
  end,
  isSameDay,
  label,
}: TEmployeeVacationDetailModalProps) => {
  const badgeTypeClass = VACATION_TYPE_COLORS[request.vacationType] || "bg-gray-400";
  const badgeStatusClass = VACATION_STATUS_CLASSES[label] || "bg-gray-400";

  return (
    <DetailModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      maxWidthClass="max-w-xl"
      title={
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="h-5 w-5 text-primary dark:text-white" />
          <span className="text-base font-bold">휴가 상세 정보</span>
          <span
            className={`mb-0.5 rounded-full px-3 py-0.5 text-xs font-semibold text-white ${badgeStatusClass}`}
          >
            {label}
          </span>
        </div>
      }
    >
      <div className="mt-6 space-y-4 text-sm text-foreground dark:text-gray-900">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">이름 : </span> {request.requester.name}
        </div>

        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">직무 : </span> {request.requester.jobName}
        </div>

        <div className="text-sm">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-4 break-words">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">기간 : </span>

            <div className="flex flex-wrap items-center gap-2">
              <span>{isSameDay ? start : `${start} ~ ${end}`}</span>
              <span className="rounded-full border-2 border-solid border-blue-500 px-3 text-xs font-extrabold text-blue-500">
                {request.vacationType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <span className="font-medium">사유 : </span> {request.reason}
          </div>
        </div>
      </div>
    </DetailModal>
  );
};

export default EmployeeVacationDetailModal;
