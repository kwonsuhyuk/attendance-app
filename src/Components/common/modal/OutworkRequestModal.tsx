import { Bell, Check, User, X } from "lucide-react";
import dayjs from "dayjs";
import DetailModal from "./commonModalLayout/DetailModal";
import { IOutworkRequest } from "@/model/types/commute.type";

interface OutworkRequestModalProps {
  open: boolean;
  onClose: () => void;
  pendingOutworkList: IOutworkRequest[];
}

const OutworkRequestModal = ({ open, onClose, pendingOutworkList }: OutworkRequestModalProps) => {
  const handleApprove = (userId: string) => {
    console.log("수락:", userId);
  };

  const handleReject = (userId: string) => {
    console.log("거절:", userId);
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
          pendingOutworkList.map((req, idx) => (
            <li
              key={`${req.requester.uid}-${req.requestDate}-${idx}`}
              className="flex items-start gap-3 rounded-md bg-white px-3 py-3 shadow-sm dark:bg-zinc-800/70"
            >
              {/* 왼쪽 아이콘 */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-point-color-sub text-sm font-bold text-white dark:bg-point-color-sub">
                <User className="text-point-color dark:text-point-color" />
              </div>

              {/* 중앙 텍스트 */}
              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {req.requester.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {req.requester.jobName || "직책 미정"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  사유: {req.outworkingMemo || "-"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  요청일자: {dayjs(req.requestDate).format("YYYY.MM.DD HH:mm")}
                </p>

                {/* 버튼 영역 (오른쪽 아래) */}
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    onClick={() => handleApprove(req.requester.uid)}
                    className="flex items-center gap-1 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400 dark:bg-transparent dark:text-emerald-300"
                  >
                    <Check className="h-4 w-4" />
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(req.requester.uid)}
                    className="flex items-center gap-1 rounded-md border border-red-500 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:border-red-400 dark:bg-transparent dark:text-red-300"
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
