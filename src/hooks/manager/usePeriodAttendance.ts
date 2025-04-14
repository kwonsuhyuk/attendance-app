// hooks/usePeriodAttendance.ts
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { EmployeeInfo } from "@/model/types/user.type";

const usePeriodAttendance = () => {
  const [tab, setTab] = useState<"total" | "employee" | "">("total");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workplaceFilter, setWorkplaceFilter] = useState("전체");
  const [workTypeFilter, setWorkTypeFilter] = useState("전체");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);

  const calendar = useMemo(() => {
    const startOfMonth = dayjs(currentDate).startOf("month").day();
    const daysInMonth = dayjs(currentDate).daysInMonth();
    const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, i) => {
      const day = i - startOfMonth + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  }, [currentDate]);

  return {
    tab,
    setTab,
    currentDate,
    setCurrentDate,
    workplaceFilter,
    setWorkplaceFilter,
    workTypeFilter,
    setWorkTypeFilter,
    employeeName,
    setEmployeeName,
    selectedEmployee,
    setSelectedEmployee,
    calendar,
  };
};

export default usePeriodAttendance;
