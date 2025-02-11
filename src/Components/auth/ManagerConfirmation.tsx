import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IManagerConfirmationProps {
  isManagerCheck: boolean;
  setManagerCheck: (checked: boolean) => void;
}

export const ManagerConfirmation = ({
  isManagerCheck,
  setManagerCheck,
}: IManagerConfirmationProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="manager-confirm" checked={isManagerCheck} onCheckedChange={setManagerCheck} />
        <Label
          htmlFor="manager-confirm"
          className={cn(
            "text-red-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          )}
        >
          관리자로 가입하는 것이 맞습니까?
        </Label>
      </div>
      {!isManagerCheck && (
        <p className="text-sm text-red-500 font-medium">체크 항목을 체크해주세요</p>
      )}
    </div>
  );
};

export default ManagerConfirmation;
