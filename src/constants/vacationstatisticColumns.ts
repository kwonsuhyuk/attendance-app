import { ColumnDef } from "@tanstack/react-table";
import { EmployeeInfo } from "@/model/types/user.type";

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
