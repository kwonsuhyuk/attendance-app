import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { TEmpUserData } from "@/model/types/user.type";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useCommuteModalText } from "@/hooks/employee/useCommuteModalText";

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
  const currentTime = useCurrentTime(open, "yyyy-MM-dd HH:mm:ss");
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
  const { actionText, timeLabel, confirmButtonColor, warningText } =
    useCommuteModalText(isCheckoutMode);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="z-[110] max-w-[90vw] bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-lg font-bold text-black dark:text-black`}>
            {actionText} 확인
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          <div className="rounded-lg rounded-md border border-solid border-gray-300 border-white-border-sub bg-white p-4">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground">근무지 이름</p>
              <p className="text-sm font-semibold text-gray-700">{place.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">근무지 주소</p>
              <p className="text-sm font-semibold text-gray-700">{place.address}</p>
            </div>
            {place.memo && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">근무지 메모</p>
                <p className="text-sm font-semibold text-gray-700">{place.memo}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between border-t pt-4 text-sm">
            <span className="text-gray-500">출근 직원 정보</span>
            <span className="font-medium text-gray-800">
              {name} · {jobName} · {employmentType}
            </span>
          </div>

          <div className="flex justify-between border-t pt-2 text-sm">
            <span className="text-gray-500">{timeLabel}</span>
            <span className="font-medium text-gray-800">{currentTime}</span>
          </div>
        </div>
        <p className="my-5 text-right text-xs text-red-500">{warningText}</p>
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
