import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useToast } from "../use-toast";

export const useVacationDetailModal = (
  request: IVacationRequest,
  onApprove: (id: number) => void,
  onReject: (id: number) => void,
  onClose: () => void,
) => {
  const { toast } = useToast();
  const isPending = request.status === "대기중";

  const detailRows = [
    { label: "휴가자", value: request.requester },
    { label: "휴가 유형", value: request.requestType },
    { label: "이메일", value: request.email ?? "-" },
    { label: "휴가 일자", value: request.requestDate },
  ];

  const handleApproveClick = () => {
    onApprove(request.id);
    toast({
      title: "승인 처리 완료",
      description: `${request.requester}님의 휴가 요청을 승인했습니다.`,
      variant: "destructive",
    });
    onClose();
  };

  const handleRejectClick = () => {
    onReject(request.id);
    toast({
      title: "거절 처리 완료",
      description: `${request.requester}님의 휴가 요청을 거절했습니다.`,
      variant: "destructive",
    });
    onClose();
  };

  return {
    isPending,
    detailRows,
    handleApproveClick,
    handleRejectClick,
  };
};
