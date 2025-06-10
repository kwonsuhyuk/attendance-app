import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useOutWorkingModal from "@/hooks/employee/useOutWorkingModal";
import { TCommuteStatus } from "@/model/types/commute.type";

type OutWorkingModalProps = {
  isCheckout?: boolean;
  status: TCommuteStatus;
};

const OutWorkingModal = ({ isCheckout = false, status }: OutWorkingModalProps) => {
  const { open, setOpen, today, submitOutJob } = useOutWorkingModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!memo.trim()) {
      setError("관리자가 확인할 수 있도록 외근 메모를 입력해주세요.");
      return;
    }
    try {
      setIsSubmitting(true);
      const nowTime = new Date().toISOString();
      await submitOutJob(memo, isCheckout, nowTime);
      setMemo("");
    } catch (error) {
      console.error("외근 처리 중 에러 발생", error);
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-3 w-full max-w-md cursor-pointer px-3 text-center font-baseFont text-sm text-black"
        >
          외근으로 {isCheckout ? "퇴근" : "출근"} 하시겠습니까?
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[102] max-w-[90vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-black">
            정말 외근으로 {isCheckout ? "퇴근" : "출근"} 하시겠습니까?
          </DialogTitle>
          <DialogDescription className="mb-4">
            {isCheckout ? (
              <p>
                {today} 기준, 근무지 밖에서 퇴근 처리시 외근으로 퇴근 처리 됩니다. (관리자에게
                문의해주세요.)
              </p>
            ) : (
              <p>{today} 기준, 외근 처리 시 외근 처리한 출퇴근 시간, 장소는 저장되지 않습니다.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <label
            htmlFor="outwork-memo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-700"
          >
            외근 메모 (필수)
          </label>
          <Textarea
            id="outwork-memo"
            value={memo}
            onChange={e => {
              setMemo(e.target.value);
              if (e.target.value.trim()) {
                setError("");
              }
            }}
            placeholder="관리자가 확인할 수 있도록 외근 관련 내용을 입력해주세요. (예: 방문 목적, 특이사항 등)"
            className="mt-1 block w-full placeholder:text-sm dark:bg-white-card-bg"
            rows={3}
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant={"outline"}
            className="bg-gray-100 text-gray-800 dark:bg-gray-100"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            className="bg-point-color text-gray-800 hover:bg-point-color-sub"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리중..." : isCheckout ? "퇴근" : "출근"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutWorkingModal;
