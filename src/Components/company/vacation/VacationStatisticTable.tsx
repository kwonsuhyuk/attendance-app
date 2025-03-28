import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { EmployeeInfo } from "@/model/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { useCompanyStore } from "@/store/company.store";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { parseISO, eachDayOfInterval } from "date-fns";

interface IVacationStatisticTableProps {
  employeeList: EmployeeInfo[];
  page: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  selectedDate: { year: number; month: number };
  mode: "month" | "year";
}

// 📌 `columns` 정의
export const generateColumns = (
  year: number,
  month: number,
  mode: "month" | "year",
): ColumnDef<EmployeeInfo>[] => [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "annualLeaveCount",
    header: "연차",
    cell: ({ row }) => {
      const value = row.original.annualLeaveCount ?? 0;
      return value === 0 ? "-" : value;
    },
  },
  {
    accessorKey: "halfLeaveCount",
    header: "반차",
    cell: ({ row }) => {
      const value = row.original.halfLeaveCount ?? 0;
      return value === 0 ? "-" : value;
    },
  },
  {
    accessorKey: "specialLeaveCount",
    header: "특별휴가",
    cell: ({ row }) => {
      const value = row.original.specialLeaveCount ?? 0;
      return value === 0 ? "-" : value;
    },
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

const VacationStatisticTable = ({
  employeeList,
  page,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  selectedDate,
  mode,
}: IVacationStatisticTableProps) => {
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
        let annual = 0;
        let half = 0;
        let special = 0;

        if (mode === "month") {
          const userEntries = data?.[emp.uid] ?? {};
          Object.values(userEntries).forEach((entry: any) => {
            const start = parseISO(entry.startDate);
            const end = parseISO(entry.endDate);
            const days = eachDayOfInterval({ start, end });
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
              const start = parseISO(entry.startDate);
              const end = parseISO(entry.endDate);
              const days = eachDayOfInterval({ start, end });
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

  return (
    <Card className="relative p-4 md:w-2/3">
      <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>
      <div className="w-full overflow-x-auto pt-4">
        <DataTable
          columns={generateColumns(selectedDate.year, selectedDate.month, mode)}
          data={updatedList}
        />
        <Pagination
          page={page}
          totalPageCount={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </Card>
  );
};

export default VacationStatisticTable;
