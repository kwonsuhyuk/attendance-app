import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { EmployeeInfo } from "@/model/types/user.type";
import { TCalendarDayInfo, TCommuteData } from "@/model/types/commute.type";
import { fetchCalendarSummaryByWorkplace, fetchCommutesByPeriod } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { mapCommuteDataToCalendar } from "@/util/mapCommuteDataToCalendar.util";
import { fetchRegisteredVacationsByMonth } from "@/api/vacation.api";
import { TRegisteredVacation } from "@/model/types/vacation.type";

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
  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const holidayList = useCompanyStore(state => state.currentCompany?.holidayList);

  const getVacationDateSet = (
    data: Record<string, Record<string, TRegisteredVacation>> | null,
    uid: string,
  ): Set<string> => {
    const set = new Set<string>();
    if (!data) return set;

    const userVacations = data[uid];
    if (!userVacations) return set;

    Object.values(userVacations).forEach(vacation => {
      const start = dayjs(vacation.startDate);
      const end = dayjs(vacation.endDate);

      for (let d = start; d.isSameOrBefore(end); d = d.add(1, "day")) {
        set.add(d.format("YYYY-MM-DD"));
      }
    });

    return set;
  };

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
          holidayList,
        );
        setCalendar(summary);
      }

      if (tab === "employee") {
        if (!selectedEmployee) {
          const empty = mapCommuteDataToCalendar(null, currentDate, workPlacesList, holidayList);
          setCalendar(empty);
          return;
        }

        const raw = await fetchCommutesByPeriod(companyCode, selectedEmployee.uid, year, month);
        const vacations = await fetchRegisteredVacationsByMonth(companyCode, year, month);
        const vacationDateSet = getVacationDateSet(vacations, selectedEmployee.uid);

        const converted = mapCommuteDataToCalendar(
          raw,
          currentDate,
          workPlacesList,
          holidayList,
          vacationDateSet,
        );

        setCalendar(converted);
      }
    };

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
