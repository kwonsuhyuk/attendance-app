import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMPLOYMENT_TYPE } from "@/constants/employmentType";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FilterForm } from "@/model/types/user.type";
import { useCompanyStore } from "@/store/company.store";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IEmployeeFilterProps {
  register: UseFormRegister<FilterForm>;
  setValue: (name: keyof FilterForm, value: string) => void;
  handleSubmit: UseFormHandleSubmit<FilterForm>;
  onSubmit: (data: FilterForm) => void;
}

const EmployeeFilter = ({ register, setValue, handleSubmit, onSubmit }: IEmployeeFilterProps) => {
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const [searchText, setSearchText] = useState("");

  const handleClearInput = () => {
    setValue("searchName", ""); // ✅ form 상태 초기화
    setSearchText(""); // ✅ 로컬 상태 초기화
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
    >
      {/* 검색 입력 필드 */}
      <div className="relative">
        <Input
          className="h-[40px] w-full px-3 dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"
          placeholder="이름 검색"
          {...register("searchName", {
            onChange: e => setSearchText(e.target.value),
          })}
        />
        {searchText && (
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-none bg-gray-200 transition hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={handleClearInput}
          >
            <X size={14} strokeWidth={5} className="font-bold text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* 직종 선택 */}
      <Select onValueChange={value => setValue("selectedJob", value)}>
        <SelectTrigger className="h-[40px] w-full dark:bg-dark-border-sub dark:text-white-bg">
          <SelectValue placeholder="직종 선택" />
        </SelectTrigger>
        <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
          <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
            전체
          </SelectItem>
          {(jobList || []).map(job => (
            <SelectItem key={job.id} value={job.name} className="dark:hover:bg-dark-border">
              {job.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 고용 형태 선택 */}
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

      {/* 모바일 전용 검색 버튼 */}
      <Button type="submit" className="h-[40px] w-full sm:hidden">
        검색
      </Button>
    </form>
  );
};

export default EmployeeFilter;
