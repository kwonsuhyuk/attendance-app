import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMPLOYMENT_TYPE } from "@/constants/employmentType";
import { UseFormRegister } from "react-hook-form";
import { FilterForm } from "@/model/types/user.type";
import { useCompanyStore } from "@/store/company.store";

interface IEmployeeFilterProps {
  register: UseFormRegister<FilterForm>;
  setValue: (name: keyof FilterForm, value: string) => void;
}

const EmployeeFilter = ({ register, setValue }: IEmployeeFilterProps) => {
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);

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
          {/* company.store의 jobList 가져와서 매핑 */}
          {(jobList || []).map(job => (
            <SelectItem key={job.id} value={job.name}>
              {job.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 급여 지급 방식 선택 */}
      <Select onValueChange={value => setValue("selectedEmploymentType", value)}>
        <SelectTrigger className="h-[40px] w-full dark:bg-dark-border-sub dark:text-white-bg">
          <SelectValue placeholder="고용 형태" />
        </SelectTrigger>
        <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
          <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
            전체
          </SelectItem>
          {Object.entries(EMPLOYMENT_TYPE).map(([key, label]) => (
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
