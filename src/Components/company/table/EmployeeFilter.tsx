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

  const selectFields = [
    {
      label: "직종",
      valueKey: "selectedJob",
      options: (jobList || []).map(job => ({ value: job.name, label: job.name })),
    },
    {
      label: "고용 형태",
      valueKey: "selectedEmploymentType",
      options: Object.entries(EMPLOYMENT_TYPE).map(([key, label]) => ({
        value: key,
        label,
      })),
    },
  ];

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
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-sidebar-primary transition hover:bg-sidebar-primary-foreground"
            onClick={handleClearInput}
          >
            <X size={18} strokeWidth={3} className="text-sidebar-foreground" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:flex sm:gap-3">
        {selectFields.map(({ label, valueKey, options }) => (
          <Select
            key={valueKey}
            onValueChange={value => setValue(valueKey as keyof FilterForm, value)}
          >
            <SelectTrigger className="h-[40px] w-full text-sidebar-foreground">
              <SelectValue placeholder={`${label} 선택`} />
            </SelectTrigger>
            <SelectContent className="dark:dark-card-bg bg-white-card-bg">
              <SelectItem value="전체" className="dark:hover:bg-dark-bg">
                전체
              </SelectItem>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value} className="dark:hover:bg-dark-bg">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <Button type="submit" className="h-[40px] w-full sm:hidden">
        검색
      </Button>
    </form>
  );
};

export default EmployeeFilter;
