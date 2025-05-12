import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useToast } from "../use-toast";
// import { sendNotification } from "@/api/notification.api";

export const useVacationDetailModal = (
  request: IVacationRequest,
  onApprove: (id: string) => void,
  onReject: (id: string) => void,
  onClose: () => void,
) => {
  const { toast } = useToast();
  const isPending = request.status === "대기중";

  const displayRequestDate = request.requestDate.includes("~")
    ? (() => {
        const [from, to] = request.requestDate.split(" ~ ");
        return from === to ? from : request.requestDate;
      })()
    : request.requestDate;

  const detailRows = [
    { label: "이름", value: request.requester.name },
    { label: "직무", value: request.requester.jobName },
    { label: "휴가 유형", value: request.requestType },
    { label: "이메일", value: request.email ?? "-" },
    { label: "휴가 일자", value: displayRequestDate },
  ];

  const handleApproveClick = () => {
    onApprove(request.id);
    // await sendNotification(request.requester.uid!, "vacation_status", "");
    toast({
      title: "승인 처리 완료",
      description: `${request.requester.name}님의 휴가 요청을 승인했습니다.`,
      variant: "destructive",
    });
    onClose();
  };

  const handleRejectClick = () => {
    onReject(request.id);
    // await sendNotification(request.requester.uid!, "vacation_status", "");
    toast({
      title: "거절 처리 완료",
      description: `${request.requester.name}님의 휴가 요청을 거절했습니다.`,
      variant: "destructive",
    });
    onClose();
  };

  return {
    isPending,
    displayRequestDate,
    detailRows,
    handleApproveClick,
    handleRejectClick,
  };
};
