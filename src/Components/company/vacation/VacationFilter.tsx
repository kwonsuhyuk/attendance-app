import { SlidersHorizontalIcon } from "lucide-react";
import MonthPicker from "@/components/common/calendar/MonthPicker";
import { Input } from "@/components/ui/input";

interface IVacationFilterProps {
  selectedMonth: { year: number; month: number };
  setSelectedMonth: (value: { year: number; month: number }) => void;
}

const VacationFilter = ({ selectedMonth, setSelectedMonth }: IVacationFilterProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit">
      <SlidersHorizontalIcon className="hidden w-10 text-white-nav-text sm:block" />
      <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
      <Input className="h-full w-full rounded-md placeholder:text-sm" placeholder="이름 검색" />
    </div>
  );
};

export default VacationFilter;
