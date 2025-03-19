import { fetchEmployees } from "@/api/employee.api";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { EmployeeInfo } from "@/model/types/user.type";
import { useCompanyStore } from "@/store/company.store";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

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

const VacationStatisticTable = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode as string);
      setEmployeeList(employees ?? []);
    }
    loadEmployees();
  }, [companyCode]);
  return (
    <Card className="relative p-4 md:w-2/3">
      <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>
      <div className="mt-4 w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <DataTable columns={columns} data={employeeList} />
        </div>
      </div>
    </Card>
  );
};

export default VacationStatisticTable;
