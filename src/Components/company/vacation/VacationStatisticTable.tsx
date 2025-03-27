import { fetchEmployees } from "@/api/employee.api";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { DUMMY_EMPLOYEES } from "@/constants/dummyEmployees";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
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
  const { paginatedEmployees, page, totalPageCount, handleNextPage, handlePreviousPage } =
    useEmployeeList();

  return (
    <Card className="relative p-4 md:w-2/3">
      <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>
      <div className="w-full overflow-x-auto pt-4">
        <DataTable columns={columns} data={paginatedEmployees} />
        <Pagination
          page={page}
          totalPageCount={totalPageCount}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </Card>
  );
};

export default VacationStatisticTable;
