import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { EmployeeInfo } from "@/model/types/user.type";
import { TCalendarDayInfo, TCommuteData } from "@/model/types/commute.type";
import { fetchCalendarSummaryByWorkplace, fetchCommutesByPeriod } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { TWorkPlace } from "@/model/types/company.type";

const usePeriodAttendance = (employeeList: EmployeeInfo[] = []) => {
  const [tab, setTab] = useState<"total" | "employee" | "">("total");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workplaceFilter, setWorkplaceFilter] = useState("전체");
  const [workTypeFilter, setWorkTypeFilter] = useState("전체");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const [calendar, setCalendar] = useState<(TCalendarDayInfo | null)[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const location = useLocation();
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList || []);

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

  useEffect(() => {
    const fetchData = async () => {
      if (!companyCode) return;

      const year = dayjs(currentDate).format("YYYY");
      const month = dayjs(currentDate).format("MM");

      if (tab === "total") {
        const summary = await fetchCalendarSummaryByWorkplace(
          companyCode,
          year,
          month,
          workplaceFilter,
          workPlacesList,
        );
        setCalendar(summary);
      }

      if (tab === "employee") {
        if (!selectedEmployee) {
          const empty = mapCommuteDataToCalendar(null, currentDate, workPlacesList);
          setCalendar(empty);
          return;
        }

        const raw = await fetchCommutesByPeriod(companyCode, selectedEmployee.uid, year, month);
        console.log("불러온 데이터", raw);
        const converted = mapCommuteDataToCalendar(raw, currentDate, workPlacesList);
        console.log("달력 데이터", converted);
        setCalendar(converted);
      }
    };

    console.log("선택된 직원: ", selectedEmployee);
    fetchData();
  }, [tab, currentDate, workplaceFilter, selectedEmployee, companyCode]);

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

// ✅ 직원 탭용 데이터 변환 함수
function mapCommuteDataToCalendar(
  data: Record<string, TCommuteData> | null,
  currentDate: Date,
  workPlacesList: TWorkPlace[] = [], // ✅ 근무지 리스트 추가
): (TCalendarDayInfo | null)[] {
  const daysInMonth = dayjs(currentDate).daysInMonth();
  const startOfMonth = dayjs(currentDate).startOf("month").day();
  const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const day = i - startOfMonth + 1;
    if (day < 1 || day > daysInMonth) return null;

    const key = String(day).padStart(2, "0");
    const commute = data?.[key];

    const startPlace =
      workPlacesList.find(p => p.id === commute?.startWorkplaceId)?.name || "근무지";
    const endPlace = workPlacesList.find(p => p.id === commute?.endWorkplaceId)?.name || "근무지";

    return {
      day,
      summary: {
        출근: commute?.startTime ? 1 : 0,
        외근: commute?.startWorkplaceId === "외근" ? 1 : 0,
        휴가: 0,
        총원: commute ? 1 : 0,
      },
      checkIn: commute?.startTime
        ? {
            time: dayjs(commute.startTime).format("HH:mm"),
            workplace: startPlace,
          }
        : undefined,
      checkOut: commute?.endTime
        ? {
            time: dayjs(commute.endTime).format("HH:mm"),
            workplace: endPlace,
          }
        : undefined,
    };
  });
}
