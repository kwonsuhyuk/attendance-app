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

interface IVacationDetailModalProps {
  request: IVacationRequest;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const VacationDetailModal: React.FC<IVacationDetailModalProps> = ({
  request,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!request) return null;

  const isPending = request.status === "대기중";

  const detailRows = [
    { label: "휴가자", value: request.requester },
    { label: "휴가 유형", value: request.requestType },
    { label: "이메일", value: request.email ?? "-" },
    { label: "휴가 일자", value: request.requestDate },
  ];
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-center dark:text-white-text">상세 정보</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-5 top-7 rounded-md border-none bg-transparent text-muted-foreground hover:text-dark-card-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="mb-3 grid gap-6 py-4">
          <div className="flex gap-5">
            {detailRows.slice(0, 2).map(({ label, value }) => (
              <div
                key={label}
                className="w-full rounded-md border bg-white-bg px-3 py-4 dark:bg-white-bg"
              >
                <strong>{label} :</strong> {value}
              </div>
            ))}
          </div>
          {detailRows.slice(2).map(({ label, value }) => (
            <div key={label} className="rounded-md border bg-white-bg px-3 py-4 dark:bg-white-bg">
              <strong>{label} :</strong> {value}
            </div>
          ))}
          <div className="whitespace-pre-wrap break-words rounded-md border bg-white-bg px-3 py-4 dark:bg-white-bg">
            <strong>사유 : </strong>
            <div className="mt-3">{request.reason}</div>
          </div>
          {!isPending && (
            <p className="flex items-center justify-end gap-2">
              <strong>처리 상태 : </strong> <StatusBadge status={request.status} />
            </p>
          )}
        </div>

        {isPending && onApprove && onReject && (
          <DialogFooter className="flex flex-row gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-full bg-green-500 hover:bg-green-600"
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
              className="w-full bg-red-500 hover:bg-red-600"
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
