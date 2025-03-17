import { DatePickerWithRange } from "@/components/common/calendar/DataRangePicker";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompanyStore } from "@/store/company.store";
import { Input } from "@/components/ui/input";

const VacationFilter = () => {
  const [filterDate, setFilterDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);

  return (
    <div className="flex w-1/2 flex-col gap-3 py-3 lg:flex-row">
      <DatePickerWithRange setFilterDate={setFilterDate} />
      <Select>
        <SelectTrigger className="h-full dark:bg-dark-border-sub dark:text-white-bg">
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
    </div>
  );
};

export default VacationFilter;
