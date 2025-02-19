import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IManagerConfirmationProps {
  isManagerCheck: boolean;
  setManagerCheck: (checked: boolean) => void;
}

export const ManagerConfirmation = ({
  isManagerCheck,
  setManagerCheck,
}: IManagerConfirmationProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = () => {
    setManagerCheck(true);
    setDialogOpen(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-300 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold text-gray-700">관리자 가입 확인</Label>
        <Checkbox id="manager-confirm" disabled checked={isManagerCheck} className="scale-125" />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full text-blue-600 font-medium">
            관리자 권한 설명 보기
          </Button>
        </DialogTrigger>
        <DialogContent className="space-y-5">
          <DialogTitle>📌 관리자 권한 안내</DialogTitle>
          <DialogDescription>
            관리자로 가입하면 다음과 같은 권한이 주어집니다:
            <ul className="mt-2 list-disc pl-4 text-gray-600">
              <li>근태 데이터 관리 및 조회</li>
              <li>직원 등록 및 승인</li>
              <li>급여 및 근무 시간 조정</li>
              <li>회사 설정 변경 가능</li>
            </ul>
            <p className="mt-4 text-red-500 font-medium">
              관리자로 등록한 후에는 변경이 불가능하니 신중히 선택해주세요.
            </p>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} variant="secondary">
              취소
            </Button>
            <Button onClick={handleConfirm} className="bg-blue-600 text-white">
              관리자 확인 및 가입
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerConfirmation;
