import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { TEmpUserData } from "@/model/types/user.type";

interface CommuteConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  place: {
    name: string;
    address: string;
    memo?: string;
  };
  isCheckoutMode: boolean;
}

const CommuteConfirmModal = ({
  open,
  onConfirm,
  onCancel,
  place,
  isCheckoutMode,
}: CommuteConfirmModalProps) => {
  const [currentTime, setCurrentTime] = useState(() => format(new Date(), "yyyy-MM-dd HH:mm:ss"));

  const { name, employmentType, jobName } = useUserStore(
    useShallow(state => {
      const user = state.currentUser as TEmpUserData;
      return {
        name: user.name,
        employmentType: user.employmentType,
        jobName: user.jobName,
      };
    }),
  );

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const actionText = isCheckoutMode ? "퇴근" : "출근";
  const timeLabel = isCheckoutMode ? "퇴근 시간" : "출근 시간";
  const confirmButtonColor = isCheckoutMode
    ? "bg-orange-500 hover:bg-orange-600"
    : "bg-green-500 hover:bg-green-600";
  const warningText = isCheckoutMode
    ? "⚠️ 퇴근 후에는 수정이 어렵습니다."
    : "⚠️ 출근 후에는 취소할 수 없습니다.";

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="z-[110] max-w-[90vw] bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-lg font-bold text-black dark:text-black`}>
            {actionText} 확인
          </DialogTitle>
          <DialogDescription>
            <p className="mt-2 text-xs text-red-500">{warningText}</p>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground">근무지 이름</p>
              <p className="text-base font-semibold text-gray-800">{place.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">근무지 주소</p>
              <p className="text-sm text-gray-700">{place.address}</p>
            </div>
            {place.memo && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">메모</p>
                <p className="text-sm italic text-gray-500">{place.memo}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between border-t pt-4 text-sm">
            <span className="text-gray-500">유저 정보</span>
            <span className="font-medium text-gray-800">
              {name}/{jobName}/{employmentType}
            </span>
          </div>

          <div className="flex justify-between border-t pt-2 text-sm">
            <span className="text-gray-500">{timeLabel}</span>
            <span className="font-medium text-gray-800">{currentTime}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button className="bg-gray-100 text-gray-800 dark:bg-gray-100" onClick={onCancel}>
            취소
          </Button>
          <Button className={`${confirmButtonColor} text-white`} onClick={onConfirm}>
            {actionText}하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommuteConfirmModal;
