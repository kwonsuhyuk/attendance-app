import { useCompanyStore } from "@/store/company.store";
import { fetchCommutesByPeriod } from "@/api/commute.api";
import dayjs from "dayjs";
import { EmployeeInfo } from "@/model/types/user.type";
import * as XLSX from "xlsx";

interface GenerateOptions {
  employee: EmployeeInfo;
  currentDate: Date;
  includeSalary: boolean;
}

export interface ISettlementRow {
  날짜: string;
  출근: string;
  퇴근: string;
  총근무시간: string;
  야간근무: string;
  휴일근무: string;
  외근: string;
  근무유형: "정상출근" | "외근" | "";
  추가수당?: string;
}

export default function useSettlement() {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const holidayList = useCompanyStore(state => state.currentCompany?.holidayList ?? []);
  const payCheckDay = useCompanyStore(state => state.currentCompany?.payCheckDay);

  const generateSettlement = async ({ employee, currentDate, includeSalary }: GenerateOptions) => {
    if (!companyCode || !payCheckDay) return [];

    const salaryAmount = employee.salaryAmount ?? 0;
    const startDate = dayjs(currentDate).subtract(1, "month").date(Number(payCheckDay));
    const endDate = dayjs(currentDate).date(Number(payCheckDay)).subtract(1, "day");

    const dates: dayjs.Dayjs[] = [];
    let cursor = startDate.clone();
    while (cursor.isSameOrBefore(endDate, "day")) {
      dates.push(cursor.clone());
      cursor = cursor.add(1, "day");
    }

    const commuteMap: Record<string, any> = {};
    for (const date of dates) {
      const year = date.format("YYYY");
      const month = date.format("MM");
      const day = date.format("DD");
      const data = await fetchCommutesByPeriod(companyCode, employee.uid, year, month);
      if (data && data[day]) {
        commuteMap[date.format("YYYY-MM-DD")] = data[day];
      }
    }

    return dates.map(date => {
      const dateStr = date.format("YYYY-MM-DD");
      const record = commuteMap[dateStr];
      const start = record?.startTime ? dayjs(record.startTime) : null;
      const end = record?.endTime ? dayjs(record.endTime) : null;

      let totalMinutes = 0;
      let nightMinutes = 0;

      if (start && end && end.isAfter(start)) {
        totalMinutes = end.diff(start, "minute");

        const nightStart = dayjs(date).hour(22).minute(0);
        const nightEnd = dayjs(date).add(1, "day").hour(6).minute(0);

        if (end.isAfter(nightStart)) {
          nightMinutes += end.diff(nightStart.isAfter(start) ? nightStart : start, "minute");
        }
        if (start.isBefore(nightEnd)) {
          nightMinutes += nightEnd.diff(start, "minute");
        }
        nightMinutes = Math.min(nightMinutes, totalMinutes);
      }

      const isWeekend = [0, 6].includes(date.day());
      const isHoliday = holidayList.includes(dateStr) || isWeekend;

      let workType: "정상출근" | "외근" | "" = "";
      if (record?.startWorkplaceId === "외근") workType = "외근";
      else if (start && end) workType = "정상출근";

      let extraPay = 0;
      if (
        includeSalary &&
        salaryAmount > 0 &&
        totalMinutes > 0 &&
        (workType === "정상출근" || workType === "외근")
      ) {
        const basePayPerMinute = salaryAmount / 60;
        const normalMinutes = totalMinutes - nightMinutes;

        if (isHoliday) {
          extraPay += basePayPerMinute * normalMinutes * 1.5;
          extraPay += basePayPerMinute * nightMinutes * 2;
        } else {
          extraPay += basePayPerMinute * normalMinutes * 1;
          extraPay += basePayPerMinute * nightMinutes * 1.5;
        }
      }

      return {
        날짜: dateStr,
        출근: start ? start.format("HH:mm") : "-",
        퇴근: end ? end.format("HH:mm") : "-",
        총근무시간: `${Math.floor(totalMinutes / 60)}시간 ${totalMinutes % 60}분`,
        야간근무: `${Math.floor(nightMinutes / 60)}시간 ${nightMinutes % 60}분`,
        휴일근무: isHoliday && workType === "정상출근" ? "✅" : "",
        외근: workType === "외근" ? "✅" : "",
        근무유형: workType,
        ...(includeSalary && {
          추가수당: extraPay > 0 ? `${Math.round(extraPay).toLocaleString()}원` : "-",
        }),
      };
    });
  };

  const downloadExcel = (
    summary: ISettlementRow[],
    employee: EmployeeInfo,
    currentDate: Date,
    includeSalary: boolean,
  ) => {
    const totalMinutes = summary.reduce((acc, cur) => {
      const match = cur.총근무시간.match(/(\d+)시간 (\d+)분/);
      return acc + (match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0);
    }, 0);

    const totalNight = summary.reduce((acc, cur) => {
      const match = cur.야간근무.match(/(\d+)시간 (\d+)분/);
      return acc + (match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0);
    }, 0);

    const holidayCount = summary.filter(row => row.휴일근무 === "✅").length;
    const totalWorkDays = summary.filter(row => row.근무유형 === "정상출근").length;
    const totalOutworkDays = summary.filter(row => row.근무유형 === "외근").length;

    const totalPay = includeSalary
      ? summary.reduce((acc, cur) => {
          const num = Number(cur.추가수당?.replace(/[^\d]/g, ""));
          return acc + (isNaN(num) ? 0 : num);
        }, 0)
      : undefined;

    const totalRow: any = {
      날짜: "총 합계",
      출근: "-",
      퇴근: "-",
      총근무시간: `${Math.floor(totalMinutes / 60)}시간 ${totalMinutes % 60}분`,
      야간근무: `${Math.floor(totalNight / 60)}시간 ${totalNight % 60}분`,
      휴일근무: `${holidayCount}일`,
      근무일: `${totalWorkDays}일`,
      외근: `${totalOutworkDays}일`,
      ...(includeSalary && { 추가수당: `${totalPay?.toLocaleString()}원` }),
    };

    const sheetData = [...summary, totalRow];
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "정산");
    const fileName = `${employee.name}_${dayjs(currentDate).format("YYYYMM")}_정산.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return {
    generateSettlement,
    downloadExcel,
  };
}
