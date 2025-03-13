import { ColumnDef } from "@tanstack/react-table";
import { EmployeeInfo } from "@/model/types/user.type";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// columns 객체를 JSON처럼 관리하고 동적으로 렌더링
export const employeeColumnsConfig = [
  { key: "name", header: "이름" },
  { key: "email", header: "이메일" },
  { key: "phoneNumber", header: "전화번호" },
  { key: "jobName", header: "직종" },
  { key: "employmentType", header: "고용 형태" },
  { key: "salaryAmount", header: "급여" },
  // { key: "edit", header: "수정" },
  // { key: "details", header: "상세보기 & 정산" },
];

export const getEmployeeColumns = (): ColumnDef<EmployeeInfo>[] => {
  return employeeColumnsConfig.map(column => ({
    accessorKey: column.key,
    header: column.header,
    cell: ({ row }) => (
      <div>
        {column.key === "salaryAmount"
          ? `${row.getValue(column.key)?.toLocaleString()} 원`
          : row.getValue(column.key)}
      </div>
    ),
  }));
};
