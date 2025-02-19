import { TPosition } from "@/model";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IPositionSelectorProps {
  position: TPosition | undefined;
  onPositionChange: (value: TPosition) => void;
}

export const PositionSelector = ({ position, onPositionChange }: IPositionSelectorProps) => {
  return (
    <div className="p-1 rounded border-2 border-blue-400">
      <Label className="block mb-3">가입 포지션</Label>
      <RadioGroup value={position} onValueChange={onPositionChange} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="manager" id="manager" />
          <Label htmlFor="manager" className="cursor-pointer">
            관리자
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="employee" id="employee" />
          <Label htmlFor="employee" className="cursor-pointer">
            직원
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
