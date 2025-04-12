import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useOutWorkingModal from "@/hooks/employee/useOutWorkingModal";

const OutWorkingModal = ({ isCheckout = false }: { isCheckout?: boolean }) => {
  const { open, setOpen, today, submitOutJob } = useOutWorkingModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="mb-3 cursor-pointer px-3 text-center text-sm font-thin underline"
        >
          외근으로 {isCheckout ? "퇴근" : "출근"} 하시겠습니까?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>정말 외근으로 {isCheckout ? "퇴근" : "출근"} 하시겠습니까?</DialogTitle>
          <DialogDescription>
            금일 {today}은 외근으로 {isCheckout ? "퇴근" : "처리"} 시 회사 출퇴근 시간이 기록되지
            않습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={() => submitOutJob(isCheckout)}>{isCheckout ? "퇴근" : "출근"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutWorkingModal;
