import { Bell, Check, User, X } from "lucide-react";
import dayjs from "dayjs";
import DetailModal from "./commonModalLayout/DetailModal";

import { useCompanyStore } from "@/store/company.store";
import { registerOutWork, deleteOutworkRequest } from "@/api/commute.api";
import { TOutworkRequestWithId } from "@/model/types/commute.type";
import { useToast } from "@/hooks/use-toast";
import { useNotification } from "@/hooks/employee/useNotification";

interface OutworkRequestModalProps {
  open: boolean;
  onClose: () => void;
  pendingOutworkList: TOutworkRequestWithId[];
}

const OutworkRequestModal = ({ open, onClose, pendingOutworkList }: OutworkRequestModalProps) => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const { toast } = useToast();
  const { notify } = useNotification();

  const handleApprove = async (req: TOutworkRequestWithId) => {
    if (!companyCode) return;

    const result = await registerOutWork(
      companyCode,
      req.requester.uid,
      req.outworkingMemo,
      req.isCheckout,
      req.requestTime,
      req.status,
    );

    if (result.success) {
      await deleteOutworkRequest(companyCode, req.id);
      await notify({
        receiverId: req.requester.uid,
        type: "outworking_approved",
        message: "외근 요청이 승인 되었습니다.",
        createdAt: Date.now(),
        read: false,
        senderId: req.requester.uid,
        relatedId: req.id,
        requestDate: req.requestTime,
      });
      toast({ title: "외근 요청이 승인되었습니다." });
    } else {
      toast({
        title: "외근 등록 실패",
        description: result.error || "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (req: TOutworkRequestWithId) => {
    if (!companyCode) return;

    const result = await deleteOutworkRequest(companyCode, req.id);
    if (result.success) {
      toast({ title: "외근 요청을 거절했습니다." });
      await notify({
        receiverId: req.requester.uid,
        type: "outworking_rejected",
        message: "외근 요청이 거절 되었습니다.",
        createdAt: Date.now(),
        read: false,
        senderId: req.requester.uid,
        relatedId: req.id,
        requestDate: req.requestTime,
      });
    } else {
      toast({
        title: "거절 실패",
        description: result.error || "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <DetailModal
      open={open}
      onClose={onClose}
      title="외근 요청 내역"
      subtitle={`총 ${pendingOutworkList.length}건`}
      icon={<Bell className="text-point-color" />}
      maxWidthClass="max-w-2xl"
    >
      <ul className="space-y-2">
        {pendingOutworkList.length > 0 ? (
          pendingOutworkList.map(req => (
            <li
              key={req.id}
              className="flex items-start gap-3 rounded-md bg-white px-3 py-3 shadow-sm dark:bg-zinc-800/70"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-point-color-sub">
                <User className="text-point-color" />
              </div>

              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {req.requester.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {req.requester.jobName || "직책 미정"}·
                  {req.requester.employmentType || "근무타입 미정"}
                </p>
                <p className="my-2 rounded-lg border border-solid border-gray-300 p-2 text-xs text-gray-500 dark:text-gray-400">
                  {req.outworkingMemo || "-"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  요청일자: {dayjs(req.requestTime).format("YYYY.MM.DD HH:mm")}
                </p>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    onClick={() => handleApprove(req)}
                    className="flex items-center gap-1 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-transparent dark:text-emerald-300"
                  >
                    <Check className="h-4 w-4" />
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(req)}
                    className="flex items-center gap-1 rounded-md border border-red-500 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-transparent dark:text-red-300"
                  >
                    <X className="h-4 w-4" />
                    거절
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">요청 내역이 없습니다.</p>
        )}
      </ul>
    </DetailModal>
  );
};

export default OutworkRequestModal;
