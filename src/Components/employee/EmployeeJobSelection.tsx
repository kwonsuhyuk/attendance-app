import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { TJob } from "@/model/types/company.type";
import PopoverHint from "../common/PopoverHint";

interface IEmployeeJobSelectionProps {
  jobList: TJob[];
  selectJob: string | undefined;
  setSelectJob: (value: string) => void;
}

const EmployeeJobSelection = ({ jobList, selectJob, setSelectJob }: IEmployeeJobSelectionProps) => {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Label className="text-lg text-black">회사 직종 선택</Label>
        <PopoverHint
          icon={<Info size={18} />}
          contentText="관리자에게 안내받지 않았다면 선택 안함을 체크해주세요"
        />
      </div>
      <Select onValueChange={setSelectJob} value={selectJob}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="직종을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="선택안함">선택 안함</SelectItem>
          {jobList?.map((job, index) => (
            <SelectItem key={index} value={job.name}>
              {job.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeJobSelection;
