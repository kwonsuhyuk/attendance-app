import { PlaneTakeoff, User, BadgeCheck, Calendar, FileText, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/company/table/VacationColumns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationDetailModal } from "@/hooks/manager/useVacationDetailModal";

interface IVacationDetailModalProps {
  request: IVacationRequest;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const VacationDetailModal = ({
  request,
  onClose,
  onApprove,
  onReject,
}: IVacationDetailModalProps) => {
  if (!request) return null;

  const { isPending, detailRows, displayRequestDate, handleApproveClick, handleRejectClick } =
    useVacationDetailModal(request, onApprove, onReject, onClose);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md dark:text-white-text">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2 text-lg dark:text-gray-900">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="h-5 w-5 text-primary dark:text-gray-900" />
              <span>휴가 상세 정보</span>
            </div>

            <StatusBadge status={request.status} />
          </DialogTitle>
        </DialogHeader>

        {/* 상세 정보 */}
        <div className="mt-6 space-y-4 text-foreground dark:text-gray-900">
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
            <span className="font-medium">기간:</span> {displayRequestDate}
            <span className="rounded-full border-2 border-solid border-blue-500 px-3 text-xs font-extrabold text-blue-500">
              {request.requestType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="mt-1 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">사유:</span>
            <div className="whitespace-pre-wrap break-words">{request.reason}</div>
          </div>
        </div>

        {/* 처리 버튼 or 닫기 */}
        {isPending ? (
          <div className="mt-10 flex gap-2">
            <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleApproveClick}>
              승인
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600" onClick={handleRejectClick}>
              거절
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VacationDetailModal;
