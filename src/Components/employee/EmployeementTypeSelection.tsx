import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import TooltipContainer from "@/components/common/TooltipContainer";
import { Info } from "lucide-react";
import { TEmploymentType } from "@/model/types/position.type";
import PopoverHint from "../common/PopoverHint";

interface IEmploymentTypeSelectionProps {
  employmentType: TEmploymentType | undefined;
  setEmploymentType: (value: TEmploymentType) => void;
}

const employmentTypes: TEmploymentType[] = ["선택안함", "정규직", "계약직", "일용직"];

const EmploymentTypeSelection = ({
  employmentType,
  setEmploymentType,
}: IEmploymentTypeSelectionProps) => {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Label className="text-lg text-black">고용 형태 선택</Label>
        <PopoverHint
          icon={<Info size={18} />}
          contentText="관리자에게 안내받지 않았다면 선택 안함을 체크해주세요"
        />
      </div>
      <Select onValueChange={setEmploymentType} value={employmentType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="고용 형태를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {employmentTypes.map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmploymentTypeSelection;
