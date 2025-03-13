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
import { EMPLOYMENT_TYPE } from "@/constants/employmentType";
import { EmployeeInfo } from "@/model/types/user.type";
import { EMPLOYEE_FIELDS } from "@/constants/empIoyeeFields";
import { useCompanyStore } from "@/store/company.store";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface IEmployeeInfoProps {
  user: EmployeeInfo;
  onClose: () => void;
  setIsUpdated: (value: boolean) => void;
}

const EmployeeModifyModal = ({ user, onClose, setIsUpdated }: IEmployeeInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    name,
    email,
    phoneNumber,
    register,
    setValue,
    salary,
    selectedJob,
    selectedEmploymentType,
    handleSalaryChange,
    handleSubmit,
    onSubmit,
  } = useEmployeeModify(user, setIsUpdated);

  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text dark:shadow-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="dark:text-white-text">직원 정보 수정</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-7 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border"
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
                <SelectTrigger className="disabled:text-gray-600 dark:bg-white-bg">
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
              type="text"
              value={salary ? salary.toLocaleString() : ""}
              onChange={handleSalaryChange}
              placeholder="급여를 미입력 시 0원 처리됩니다."
              className="h-10 placeholder:text-sm disabled:text-gray-600 dark:bg-white-bg"
              disabled={!isEditing}
            />
            <span className="text-xs text-gray-500">= {numToKorean(salary)} 원</span>
          </div>
        </div>

        <DialogFooter>
          <Link to={`/${companyCode}/datecheck/${user.uid}`}>
            <Button variant="outline" className="dark:bg-white-bg dark:text-white-text">
              상세보기 & 정산
            </Button>
          </Link>
          <Button
            onClick={() => {
              if (isEditing) {
                handleSubmit(onSubmit)();
              }
              setIsEditing(!isEditing);
            }}
            className="dark:bg-white-bg dark:hover:text-white-text"
          >
            {isEditing ? "완료" : "수정"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModifyModal;
