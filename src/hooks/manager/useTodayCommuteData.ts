import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { fetchEmployees } from "@/api/employee.api";

import { TCommuteRecord } from "@/model/types/commute.type";
import { fetchTodayCommuteDataWithUserInfo } from "@/api/commute.api";
import { TEmpUserData } from "@/model/types/user.type";

interface UseTodayCommuteDataProps {
  year: string;
  month: string;
  day: string;
}

export function useTodayCommuteData({ year, month, day }: UseTodayCommuteDataProps) {
  const { companyCode } = useParams();
  const [employeeList, setEmployeeList] = useState<TEmpUserData[]>([]);
  const [commuteData, setCommuteData] = useState<TCommuteRecord[]>([]);

  useEffect(() => {
    if (!companyCode) return;

    async function loadEmployees() {
      try {
        const employees = await fetchEmployees(companyCode as string);
        setEmployeeList(employees);
      } catch (error) {
        console.error("❌ 직원 데이터 불러오기 실패:", error);
        setEmployeeList([]);
      }
    }

    loadEmployees();
  }, [companyCode]);

  useEffect(() => {
    if (!companyCode) return;

    async function loadCommuteData() {
      try {
        const data = await fetchTodayCommuteDataWithUserInfo(
          companyCode as string,
          year,
          month,
          day,
        );
        setCommuteData(data ?? []);
      } catch (error) {
        console.error("❌ 출퇴근 데이터 불러오기 실패:", error);
        setCommuteData([]);
      }
    }

    loadCommuteData();
  }, [companyCode, year, month, day]);

  const workingEmployees = commuteData
    .filter(record => record.startTime && !record.endTime)
    .map(record => ({
      user: record.userInfo,
      startTime: record.startTime,
    }));

  return {
    employeeList,
    commuteData,
    totalEmployeeNumber: employeeList.length,
    commuteEmployeeNumber: commuteData.length,
    workingEmployees,
  };
}
