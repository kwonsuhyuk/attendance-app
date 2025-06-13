import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployees } from "@/api/employee.api";
import { TCommuteRecord } from "@/model/types/commute.type";
import {
  fetchTodayCommuteDataWithUserInfo,
  subscribeToTodayCommuteDataWithUserInfo,
} from "@/api/commute.api";
import { TEmpUserData } from "@/model/types/user.type";
import dayjs from "dayjs";

interface UseTodayCommuteDataProps {
  year: string;
  month: string;
  day: string;
}

export function useTodayCommuteData({ year, month, day }: UseTodayCommuteDataProps) {
  const { companyCode } = useParams();
  const [employeeList, setEmployeeList] = useState<TEmpUserData[]>([]);
  const [todayCommuteData, setTodayCommuteData] = useState<TCommuteRecord[]>([]);
  const [workingEmployees, setWorkingEmployees] = useState<
    { user: any; startTime: string; date: string }[]
  >([]);

  const todayStr = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
  const yesterday = dayjs(todayStr).subtract(1, "day");
  const yYear = yesterday.format("YYYY");
  const yMonth = yesterday.format("MM");
  const yDay = yesterday.format("DD");
  const yesterdayStr = yesterday.format("YYYY-MM-DD");

  useEffect(() => {
    if (!companyCode) return;

    const loadEmployees = async () => {
      try {
        const employees = await fetchEmployees(companyCode as string);
        setEmployeeList(employees);
      } catch (error) {
        console.error("❌ 직원 데이터 불러오기 실패:", error);
        setEmployeeList([]);
      }
    };

    loadEmployees();
  }, [companyCode]);

  useEffect(() => {
    if (!companyCode) return;

    let unsubscribe: () => void;

    const init = async () => {
      unsubscribe = await subscribeToTodayCommuteDataWithUserInfo(
        companyCode,
        year,
        month,
        day,
        data => setTodayCommuteData(data || []),
      );
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [companyCode, year, month, day]);

  useEffect(() => {
    if (!companyCode) return;

    const calculateWorkingEmployees = async () => {
      try {
        const yesterdayData = await fetchTodayCommuteDataWithUserInfo(
          companyCode,
          yYear,
          yMonth,
          yDay,
        );

        const filtered = [...(yesterdayData || []), ...todayCommuteData].filter(record => {
          if (!record.startTime || record.endTime || record.outworkingMemo) return false;

          const recordDateStr = dayjs(record.startTime).format("YYYY-MM-DD");
          return recordDateStr === todayStr || recordDateStr === yesterdayStr;
        });

        const result = filtered
          .filter(record => record.userInfo && record.startTime)
          .map(record => ({
            user: record.userInfo!,
            startTime: record.startTime!,
            date: dayjs(record.startTime!).format("YYYY-MM-DD"),
          }));

        setWorkingEmployees(result);
      } catch (error) {
        console.error("❌ 어제 출근 데이터 가져오기 실패:", error);
        setWorkingEmployees([]);
      }
    };

    calculateWorkingEmployees();
  }, [companyCode, todayCommuteData]);

  return {
    employeeList,
    commuteData: todayCommuteData,
    totalEmployeeNumber: employeeList.length,
    commuteEmployeeNumber: todayCommuteData.length,
    workingEmployees, // 오늘 + 어제 출근 후 퇴근 안 한 사람
  };
}
