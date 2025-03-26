import { useCompanyStore } from "@/store/company.store";
import { SlidersHorizontalIcon } from "lucide-react";
import { DateRangePicker } from "@/components/ui/DataRangePicker";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import FilterModal from "@/components/common/modal/FilterModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VacationFilter = () => {
  const today = new Date();
  const firstDay = startOfMonth(today);
  const lastDay = endOfMonth(today);

  const [filterDate, setFilterDate] = useState<DateRange | undefined>({
    from: firstDay,
    to: lastDay,
  });

  const jobList = useCompanyStore(state => state.currentCompany?.jobList || []);

  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit">
      <SlidersHorizontalIcon className="hidden w-10 text-white-nav-text sm:block" />
      <DateRangePicker date={filterDate} setDate={setFilterDate} className="w-full" />
      <FilterModal jobList={jobList} />
    </div>
  );
};

export default VacationFilter;
