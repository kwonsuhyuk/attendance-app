import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TVacationRequest } from "@/model/types/vacation.type";
import { Calendar, User, BadgeCheck, FileText, PlaneTakeoff } from "lucide-react";
import { VACATION_STATUS_CLASSES, VACATION_TYPE_COLORS } from "@/constants/\bvacation";

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
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="w-[90vw] max-w-md dark:text-white-text">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2 text-lg dark:text-gray-900">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="h-5 w-5 text-primary dark:text-gray-900" /> 휴가 상세 정보
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeStatusClass}`}
              >
                {label}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* 상단 뱃지 정보 */}

        {/* 세부 정보 */}
        <div className="mt-6 space-y-4 text-sm text-foreground dark:text-gray-900">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">이름:</span> {request.requester.name}
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">직무:</span> {request.requester.jobName}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">기간:</span> {isSameDay ? start : `${start} ~ ${end}`}
            <span
              className={`rounded-full border-2 border-solid border-blue-500 px-3 text-xs font-extrabold text-blue-500`}
            >
              {request.vacationType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">사유:</span> {request.reason}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeVacationDetailModal;
