import { useCompanyStore } from "@/store/company.store";
import { SlidersHorizontalIcon } from "lucide-react";
import { DatePickerWithRange } from "@/components/common/calendar/DataRangePicker";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
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
  const [filterDate, setFilterDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const jobList = useCompanyStore(state => state.currentCompany?.jobList || []);

  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit">
      <SlidersHorizontalIcon className="hidden text-white-nav-text sm:block" />
      <DatePickerWithRange setFilterDate={setFilterDate} />
      <FilterModal jobList={jobList} />
      <div className="hidden w-full gap-3 sm:flex sm:w-fit">
        {/* 직무 선택 */}
        <Select>
          <SelectTrigger className="h-10 min-w-36 dark:bg-dark-border-sub dark:text-white-bg">
            <SelectValue placeholder="직종 선택" />
          </SelectTrigger>
          <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
            <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
              전체
            </SelectItem>
            {jobList.map(job => (
              <SelectItem key={job.id} value={job.name} className="dark:hover:bg-dark-border">
                {job.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* 이름 검색 */}
        <Input className="h-10 min-w-24 rounded-md placeholder:text-sm" placeholder="이름 검색" />
        {/* 검색 버튼 */}
        <Button className="h-10 w-full sm:w-fit">검색</Button>
      </div>
    </div>
  );
};

export default VacationFilter;
