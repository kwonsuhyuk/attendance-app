import { Link } from "react-router-dom";
import { formatMoney, numToKorean } from "../../../util/formatMoney.util";
import { useEmployeeModify } from "@/hooks/manager/useEmployeeModify";
import { EmployeeInfo } from "@/model/types/user.type";
import { EMPLOYMENT_TYPE } from "@/constants/employmentType";
import { EMPLOYEE_FIELDS } from "@/constants/empIoyeeFields";
import { Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PopoverHint from "@/components/common/PopoverHint";

interface IEmployeeInfoProps {
  user: EmployeeInfo;
  onClose: () => void;
  setIsUpdated: (value: boolean) => void;
}

const EmployeeModifyModal = ({ user, onClose, setIsUpdated }: IEmployeeInfoProps) => {
  const {
    setValue,
    salary,
    selectedJob,
    selectedEmploymentType,
    handleSalaryChange,
    handleSubmit,
    onSubmit,
    isEditing,
    setIsEditing,
    jobList,
    companyCode,
  } = useEmployeeModify(user, setIsUpdated);

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text dark:shadow-lg sm:max-w-md">
        <DialogHeader className="relative flex justify-between">
          <div className="flex items-center gap-4">
            <DialogTitle className="dark:text-white-text">직원 정보 수정</DialogTitle>
            <div className="flex gap-2">
              <Link
                to={{
                  pathname: `/${companyCode}/manager/periodatt`,
                  search: `?tab=employee&userId=${user.uid}`,
                }}
              >
                <Button
                  variant="outline"
                  className="dark:border-bg-dark-border h-[30px] p-2 text-xs dark:bg-dark-border dark:text-white-text dark:hover:bg-white-bg"
                >
                  상세보기
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `/${companyCode}/manager/settlement`,
                }}
              >
                <Button
                  variant="outline"
                  className="dark:border-bg-dark-border h-[30px] p-2 text-xs dark:bg-dark-border dark:text-white-text dark:hover:bg-white-bg"
                >
                  정산
                </Button>
              </Link>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute right-1 top-3 rounded-md border-none bg-transparent text-muted-foreground hover:text-dark-card-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="grid gap-8 py-8">
          {EMPLOYEE_FIELDS.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="font-medium">{label}</span>
              <span>{String((user as EmployeeInfo)[key] ?? "")}</span>
            </div>
          ))}

          {[
            {
              label: "직종",
              value: selectedJob,
              onChange: (value: string) => setValue("selectedJob", value),
              options: (jobList || []).map(job => ({ value: job.name, label: job.name })),
            },
            {
              label: "고용 형태",
              value: selectedEmploymentType,
              onChange: (value: string) => setValue("selectedEmploymentType", value),
              options: Object.entries(EMPLOYMENT_TYPE).map(([key, label]) => ({
                value: key,
                label,
              })),
            },
          ].map(({ label, value, onChange, options }) => (
            <div key={label} className="flex flex-col gap-3">
              <span className="font-medium">{label}</span>
              <Select defaultValue={value} onValueChange={onChange} disabled={!isEditing}>
                <SelectTrigger className="disabled:text-dark-bg dark:text-white-text dark:disabled:text-dark-bg">
                  <SelectValue placeholder={`${label} 선택`} />
                </SelectTrigger>
                <SelectContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text">
                  {options.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="dark:text-white-text dark:hover:bg-white-bg"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="mt-1 font-medium">급여</span>
              <PopoverHint
                icon={<Info size={18} />}
                contentText="직원 정산에 쓰이기 위한 정보이며, 시급으로 환산되어 정산에
              사용됩니다. 정산에 사용하실려면 반드시 시급 정보를 입력해주세요."
              />
            </div>

            <Input
              type="text"
              value={salary ? formatMoney(salary) : ""}
              onChange={handleSalaryChange}
              placeholder="급여 미입력 시 0원 처리됩니다."
              className="h-10 placeholder:text-sm disabled:text-dark-bg dark:bg-white-bg dark:text-white-text dark:disabled:text-dark-bg"
              disabled={!isEditing}
            />
            <span className="text-xs text-white-nav-text">= {numToKorean(salary)} 원</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              if (isEditing) {
                handleSubmit(onSubmit)();
              }
              setIsEditing(!isEditing);
            }}
            className="w-full dark:bg-dark-bg dark:text-dark-text dark:hover:bg-dark-card-bg"
          >
            {isEditing ? "완료하기" : "수정하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModifyModal;
