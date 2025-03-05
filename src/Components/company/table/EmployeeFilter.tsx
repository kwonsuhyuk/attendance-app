import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";
import { UseFormRegister } from "react-hook-form";
import { FilterForm } from "@/model/types/user.type";

interface IEmployeeFilterProps {
  register: UseFormRegister<FilterForm>;
  setValue: (name: keyof FilterForm, value: string) => void;
}

const EmployeeFilter = ({ register, setValue }: IEmployeeFilterProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {/* 검색 입력 필드 */}
      <Input
        className="h-[40px] w-full px-3 dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"
        placeholder="이름 검색"
        {...register("searchName")}
      />

      {/* 직종 선택 */}
      <Select onValueChange={value => setValue("selectedJob", value)}>
        <SelectTrigger className="h-[40px] w-full dark:bg-dark-border-sub dark:text-white-bg">
          <SelectValue placeholder="직종 선택" />
        </SelectTrigger>
        <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
          <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
            전체
          </SelectItem>
          {["과장", "대리", "사원", "신입"].map(job => (
            <SelectItem key={job} value={job} className="dark:hover:bg-dark-border">
              {job}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 급여 지급 방식 선택 */}
      <Select onValueChange={value => setValue("selectedSalaryType", value)}>
        <SelectTrigger className="h-[40px] w-full dark:bg-dark-border-sub dark:text-white-bg">
          <SelectValue placeholder="급여 지급 방식" />
        </SelectTrigger>
        <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
          <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
            전체
          </SelectItem>
          {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
            <SelectItem key={key} value={key} className="dark:hover:bg-dark-border">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeFilter;
