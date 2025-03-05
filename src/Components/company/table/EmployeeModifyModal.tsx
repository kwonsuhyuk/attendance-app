import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMoney, numToKorean } from "../../../util/formatMoney.util";
import { useEmployeeModify } from "@/hooks/manager/useEmployeeModify";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";
import { EmployeeInfo, EmployeeForm } from "@/model/types/user.type";

interface IEmployeeInfoProps {
  user: EmployeeInfo;
  onClose: () => void;
}

const EmployeeModifyModal = ({ user, onClose }: IEmployeeInfoProps) => {
  const {
    name,
    email,
    phoneNumber,
    setValue,
    salary,
    selectedJob,
    selectedSalaryType,
    handleSalaryChange,
  } = useEmployeeModify(user, onClose);

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text dark:shadow-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="dark:text-white-text">직원 정보 수정</DialogTitle>
        </DialogHeader>

        <div className="grid gap-8 py-8">
          {[
            { label: "이름", value: name },
            { label: "이메일", value: email },
            { label: "휴대전화", value: phoneNumber },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="font-medium">{label}</span>
              <span>{value}</span>
            </div>
          ))}

          {[
            {
              label: "직종",
              value: selectedJob,
              onChange: (value: string) => setValue("selectedJob", value),
              options: ["과장", "대리", "직원"].map(job => ({ value: job, label: job })),
            },
            {
              label: "급여 지급 방식",
              value: selectedSalaryType,
              onChange: (value: string) => setValue("selectedSalaryType", value),
              options: Object.entries(PAYMENT_METHODS).map(([key, label]) => ({
                value: key,
                label,
              })),
            },
          ].map(({ label, value, onChange, options }) => (
            <div key={label} className="flex flex-col gap-3">
              <span className="font-medium">{label}</span>
              <Select defaultValue={value} onValueChange={onChange}>
                <SelectTrigger className="dark:bg-white-bg">
                  <SelectValue placeholder={`${label} 선택`} />
                </SelectTrigger>
                <SelectContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text">
                  {options.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="dark:text-white-text dark:hover:bg-dark-border"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="font-medium">급여</span>
            <Input
              type="number"
              value={salary}
              onChange={handleSalaryChange}
              className="dark:bg-white-bg"
            />
            <span className="text-xs text-gray-500">= {numToKorean(salary)} 원</span>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" className="dark:bg-white-bg dark:hover:text-white-text">
            저장
          </Button>
          <Button onClick={onClose} className="dark:bg-white-bg dark:hover:text-white-text">
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModifyModal;
