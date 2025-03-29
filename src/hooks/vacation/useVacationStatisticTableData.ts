import { useEffect, useState } from "react";
import { parseISO, eachDayOfInterval } from "date-fns";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { EmployeeInfo } from "@/model/types/user.type";
import { useCompanyStore } from "@/store/company.store";

export const useVacationStatisticTableData = (
  employeeList: EmployeeInfo[],
  selectedDate: { year: number; month: number },
  mode: "month" | "year",
) => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const [updatedList, setUpdatedList] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    const fetchVacationStats = async () => {
      if (!companyCode) return;

      const year = selectedDate.year.toString();
      const month = (selectedDate.month + 1).toString().padStart(2, "0");

      let data: any;
      if (mode === "month") {
        data = await fetchRegisteredVacationsByMonth(companyCode, year, month);
      } else {
        data = await fetchRegisteredVacationsByYear(companyCode, year);
      }

      const newList = employeeList.map(emp => {
        let annual = 0,
          half = 0,
          special = 0;

        if (mode === "month") {
          const userEntries = data?.[emp.uid] ?? {};
          Object.values(userEntries).forEach((entry: any) => {
            const days = eachDayOfInterval({
              start: parseISO(entry.startDate),
              end: parseISO(entry.endDate),
            });
            days.forEach(() => {
              if (entry.vacationType === "연차") annual++;
              else if (entry.vacationType === "반차") half++;
              else if (entry.vacationType === "특별 휴가") special++;
            });
          });
        } else {
          Object.values(data ?? {}).forEach((monthData: any) => {
            const userEntries = monthData?.[emp.uid] ?? {};
            Object.values(userEntries).forEach((entry: any) => {
              const days = eachDayOfInterval({
                start: parseISO(entry.startDate),
                end: parseISO(entry.endDate),
              });
              days.forEach(() => {
                if (entry.vacationType === "연차") annual++;
                else if (entry.vacationType === "반차") half++;
                else if (entry.vacationType === "특별 휴가") special++;
              });
            });
          });
        }

        return {
          ...emp,
          annualLeaveCount: annual,
          halfLeaveCount: half,
          specialLeaveCount: special,
          totalLeaveCount: annual + half + special,
        };
      });

      setUpdatedList(newList);
    };

    fetchVacationStats();
  }, [companyCode, employeeList, selectedDate, mode]);

  return updatedList;
};
