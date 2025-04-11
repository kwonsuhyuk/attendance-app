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

const OutWorkingModal = () => {
  const { open, setOpen, today, submitOutJob } = useOutWorkingModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-3 cursor-pointer text-center text-sm font-thin underline">
          외근 시 여기를 클릭해주세요.
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>정말 외근으로 출근 하시는게 맞습니까?</DialogTitle>
          <DialogDescription>
            금일 {today}을 외근으로 출근 시 회사 출퇴근 시간이 기록되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={submitOutJob}>출근</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutWorkingModal;
