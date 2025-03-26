import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { StatusBadge } from "@/components/company/table/VacationColumns";

interface VacationDetailModalProps {
  request: IVacationRequest;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const VacationDetailModal: React.FC<VacationDetailModalProps> = ({
  request,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!request) return null;

  const isPending = request.status === "대기중";
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="dark:bg-white-bg dark:text-white-text sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="dark:text-white-text">요청 상세 정보</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-5 top-7 rounded-md border-none bg-transparent text-muted-foreground hover:text-dark-card-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <p>
            <strong>요청 유형 : </strong> {request.requestType}
          </p>
          <p>
            <strong>요청자 : </strong> {request.requester}
          </p>
          <p>
            <strong>이메일 : </strong> {request.email ?? "-"}
          </p>
          <p>
            <strong>요청 일자 : </strong> {request.requestDate}
          </p>
          <p>
            <strong>사유 : </strong> <br />
            <br />
            {request.reason}
          </p>
          {!isPending && (
            <p>
              <strong>처리 상태 : </strong> <StatusBadge status={request.status} />
            </p>
          )}
        </div>

        {isPending && onApprove && onReject && (
          <DialogFooter>
            <Button
              variant="default"
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                onApprove(request.id);
                toast.success("승인 처리되었습니다.");
                onClose();
              }}
            >
              승인
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                onReject(request.id);
                toast.error("거절 처리되었습니다.");
                onClose();
              }}
            >
              거절
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VacationDetailModal;
