import React, { useEffect, useMemo, useState } from "react";
import VacationFilter from "@/components/company/vacation/VacationFilter";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format, startOfMonth, endOfMonth, addDays } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { useCompanyStore } from "@/store/company.store";
import { fetchEmployees } from "@/api/employee.api";
import { EmployeeInfo } from "@/model/types/user.type";
import { ColumnDef } from "@tanstack/react-table";

// 📌 `columns` 정의
export const columns: ColumnDef<EmployeeInfo>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "annualLeaveCount",
    header: "연차",
    cell: ({ row }) => row.original.annualLeaveCount ?? "-",
  },
  {
    accessorKey: "halfLeaveCount",
    header: "반차",
    cell: ({ row }) => row.original.halfLeaveCount ?? "-",
  },
  {
    accessorKey: "specialLeaveCount",
    header: "특별휴가",
    cell: ({ row }) => row.original.specialLeaveCount ?? "-",
  },
  {
    accessorKey: "totalLeaveCount",
    header: "총 휴가",
    cell: ({ row }) => {
      const { annualLeaveCount, halfLeaveCount, specialLeaveCount } = row.original;
      const total = (annualLeaveCount ?? 0) + (halfLeaveCount ?? 0) + (specialLeaveCount ?? 0);
      return total === 0 ? "-" : total;
    },
  },
];

// 📌 이번 달의 모든 날짜를 생성하는 함수
const getMonthDates = () => {
  const today = new Date();
  const firstDay = startOfMonth(today);
  const lastDay = endOfMonth(today);

  let dates = [];
  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    dates.push(format(day, "MM-dd")); // "03-01", "03-02" 형식
  }
  return dates;
};

// 📌 더미 데이터 생성: 날짜별 연차, 반차, 특별 휴가 사용 직원 수
const generateDummyVacationData = () => {
  const dates = getMonthDates();
  return dates.map(date => ({
    date,
    annual: Math.floor(Math.random() * 10), // 0~9 랜덤 값
    half: Math.floor(Math.random() * 5), // 0~4 랜덤 값
    special: Math.floor(Math.random() * 3), // 0~2 랜덤 값
  }));
};

const VacationStatisticPage = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const dummyVacationData = useMemo(() => generateDummyVacationData(), []);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode as string);
      setEmployeeList(employees ?? []);
      // 이 주석 코드는 더미데이터를 포함한 리스트 입니다.
      // setEmployeeList([...employees, ...DUMMY_EMPLOYEES]);
    }
    loadEmployees();
  }, [companyCode]);
  return (
    <VacationStatisticLayout>
      <VacationFilter />
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <h2 className="mb-4 text-lg font-semibold">직원 휴가 사용 현황</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dummyVacationData} className="text-sm" margin={{ left: 0, right: 10 }}>
              <XAxis dataKey="date" stroke="gray" />
              <YAxis stroke="gray" width={30} />
              <Tooltip />
              <Legend align="right" />
              <Bar dataKey="annual" fill="#0F4C75" name="연차" radius={[4, 4, 0, 0]} />
              <Bar dataKey="half" fill="#3282B8" name="반차" radius={[4, 4, 0, 0]} />
              <Bar dataKey="special" fill="#BBE1FA" name="특별 휴가" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="relative p-4">
          <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>
          <div className="mt-4 w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <DataTable columns={columns} data={employeeList} />
            </div>
          </div>

          {/* <Pagination
            page={page}
            totalPageCount={totalPageCount}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          /> */}
        </Card>
      </div>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;

// 컴포넌트화,
