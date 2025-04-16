// hooks/usePeriodAttendance.ts
import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { EmployeeInfo } from "@/model/types/user.type";
import { useLocation } from "react-router-dom";

const usePeriodAttendance = (employeeList: EmployeeInfo[] = []) => {
  const [tab, setTab] = useState<"total" | "employee" | "">("total");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workplaceFilter, setWorkplaceFilter] = useState("전체");
  const [workTypeFilter, setWorkTypeFilter] = useState("전체");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  const calendar = useMemo(() => {
    const startOfMonth = dayjs(currentDate).startOf("month").day();
    const daysInMonth = dayjs(currentDate).daysInMonth();
    const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, i) => {
      const day = i - startOfMonth + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  }, [currentDate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab") as "total" | "employee" | null;
    const userId = searchParams.get("userId");

    if (tabParam) setTab(tabParam);

    if (!isInitialized && userId && employeeList.length > 0) {
      const target = employeeList.find(emp => emp.uid === userId);
      if (target) {
        setSelectedEmployee(target);
        setTab("employee");
        setIsInitialized(true);
      }
    }
  }, [location.search, employeeList, isInitialized]);

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
