import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { toast } from "react-toastify";

export const useVacationDetailModal = (
  request: IVacationRequest,
  onApprove: (id: number) => void,
  onReject: (id: number) => void,
  onClose: () => void,
) => {
  const isPending = request.status === "대기중";

  const detailRows = [
    { label: "휴가자", value: request.requester },
    { label: "휴가 유형", value: request.requestType },
    { label: "이메일", value: request.email ?? "-" },
    { label: "휴가 일자", value: request.requestDate },
  ];

  const handleApproveClick = () => {
    onApprove(request.id);
    toast.success("승인 처리되었습니다.");
    onClose();
  };

  const handleRejectClick = () => {
    onReject(request.id);
    toast.error("거절 처리되었습니다.");
    onClose();
  };

  return {
    isPending,
    detailRows,
    handleApproveClick,
    handleRejectClick,
  };
};
