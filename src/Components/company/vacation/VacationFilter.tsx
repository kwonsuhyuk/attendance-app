import { useEffect, useState } from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import MonthPicker from "@/components/common/calendar/MonthPicker";
import AutoCompleteUserInput from "@/components/common/AutoCompleteInput";
import { EmployeeInfo } from "@/model/types/user.type";
import { useSearchParams } from "react-router-dom";

interface IVacationFilterProps {
  selectedMonth: { year: number; month: number };
  setSelectedMonth: (value: { year: number; month: number }) => void;
  selectedMode: "month" | "year";
  selectedName: EmployeeInfo | null;
  setSelectedMode: (value: "month" | "year") => void;
  handleNameSelect: (user: EmployeeInfo | null) => void;
  employeeList: EmployeeInfo[];
}

const VacationFilter = ({
  selectedMonth,
  setSelectedMonth,
  selectedMode,
  selectedName,
  setSelectedMode,
  handleNameSelect,
  employeeList,
}: IVacationFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("user");
    setSearchParams(newParams);
    handleNameSelect(null);
  };

  return (
    <div
      className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit"
      data-tour="vstatic-1"
    >
      <MonthPicker
        value={selectedMonth}
        onChange={setSelectedMonth}
        mode={selectedMode}
        setMode={setSelectedMode}
      />
      <AutoCompleteUserInput
        value={selectedName?.name ?? ""}
        users={employeeList}
        onSelect={handleNameSelect}
        onClear={handleClear}
      />
    </div>
  );
};

export default VacationFilter;
