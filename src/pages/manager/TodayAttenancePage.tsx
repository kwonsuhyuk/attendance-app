import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import {
  AttendanceHeader,
  AttendanceStatsCards,
  FullAttendanceRatioChart,
  OutworkingBox,
  WorkplaceBreakdown,
} from "@/components/company/attendance/DaliyAttendanceUI";
import { getKSTFormattedDate } from "@/util/time.util";
import { useTour } from "@/hooks/use-tour";
import { todayAttSteps } from "@/constants/managerTourSteps";

const TodayAttenancePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");

  const initialDate = dateParam ? new Date(dateParam) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  useEffect(() => {
    if (!dateParam) {
      const todayStr = getKSTFormattedDate(new Date());
      setSearchParams({ date: todayStr }, { replace: true });
    }
  }, [dateParam, setSearchParams]);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    const formatted = getKSTFormattedDate(newDate);
    setSearchParams({ date: formatted }, { replace: true });
  };

  useTour("today_att", todayAttSteps);

  return (
    <>
      <Seo
        title="금일 출퇴근 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <div className="max-w-7xl flex-1 space-y-6">
        <AttendanceHeader selectedDate={selectedDate} setSelectedDate={handleDateChange} />
        <AttendanceStatsCards selectedDate={selectedDate} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FullAttendanceRatioChart selectedDate={selectedDate} />
          <OutworkingBox selectedDate={selectedDate} />
        </div>
        <div className="w-full">
          <WorkplaceBreakdown selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default TodayAttenancePage;
