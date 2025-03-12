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
  layout?: "pc" | "mobile";
}

const EmployeeFilter = ({ register, setValue, handleSubmit, onSubmit }: IEmployeeFilterProps) => {
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const [searchText, setSearchText] = useState("");

  const handleClearInput = () => {
    setValue("searchName", "");
    setSearchText("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="relative w-full sm:col-span-1">
        <Input
          className="h-[40px] w-full px-3 pr-10 dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"
          placeholder="이름 검색"
          {...register("searchName", {
            onChange: e => setSearchText(e.target.value),
          })}
        />
        {searchText && (
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-none bg-gray-200 transition hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={handleClearInput}
          >
            <X size={18} strokeWidth={3} className="text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:flex sm:gap-3">
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

      <Button type="submit" className="h-[40px] w-full sm:hidden">
        검색
      </Button>
    </form>
  );
};

export default EmployeeFilter;
