import { useCompanyStore } from "@/store/company.store";
import { SlidersHorizontalIcon } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/util/cn.util";
import FilterModal from "@/components/common/modal/FilterModal";
import MonthPicker from "@/components/common/calendar/MonthPicker";

const VacationFilter = () => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const jobList = useCompanyStore(state => state.currentCompany?.jobList || []);

  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit">
      <SlidersHorizontalIcon className="hidden w-10 text-white-nav-text sm:block" />
      <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
      <FilterModal jobList={jobList} />
    </div>
  );
};

export default VacationFilter;
