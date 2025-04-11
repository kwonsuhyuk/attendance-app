import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

interface CustomCalendarHeaderProps {
  onChangeMonth?: (date: Date) => void;
}

const CustomCalendarHeader = ({ onChangeMonth }: CustomCalendarHeaderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
    onChangeMonth?.(newDate);
  };

  const handlePrevMonth = () => {
    handleMonthChange(dayjs(currentDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    handleMonthChange(dayjs(currentDate).add(1, "month").toDate());
  };

  useEffect(() => {
    onChangeMonth?.(currentDate); // 초기 렌더 시 전달
  }, []);

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <button onClick={handlePrevMonth}>
        <ChevronLeft className="h-6 w-6" />
      </button>
      <span className="text-lg font-semibold">{dayjs(currentDate).format("YYYY년 MM월")}</span>
      <button onClick={handleNextMonth}>
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CustomCalendarHeader;
