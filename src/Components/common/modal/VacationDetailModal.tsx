import { PlaneTakeoff, User, BadgeCheck, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/company/table/VacationColumns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationDetailModal } from "@/hooks/manager/useVacationDetailModal";
import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal"; // ✅ 공통 모달 적용

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
    <DetailModal
      open
      onClose={onClose}
      maxWidthClass="max-w-xl"
      title={
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="h-5 w-5 text-primary dark:text-white" />
          <span className="text-base font-bold">휴가 상세 정보</span>
          <StatusBadge status={request.status} />
        </div>
      }
    >
      {/* 상세 정보 */}
      <div className="mb-6 space-y-4 text-foreground dark:text-gray-900">
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

        <div className="flex items-start gap-2">
          <FileText className="mt-1 h-4 w-4 text-muted-foreground" />
          <div>
            <span className="font-medium">사유:</span> {request.reason}
          </div>
        </div>
      </div>

      {/* 처리 버튼 or 닫기 */}
      {isPending && (
        <div className="mt-10 flex gap-2">
          <Button className="w-full bg-green-400 hover:bg-green-500" onClick={handleApproveClick}>
            승인
          </Button>
          <Button className="w-full bg-red-400 hover:bg-red-500" onClick={handleRejectClick}>
            거절
          </Button>
        </div>
      )}
    </DetailModal>
  );
};

export default VacationDetailModal;
