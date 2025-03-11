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
  { key: "edit", header: "수정" },
  { key: "details", header: "상세보기 & 정산" },
];

export const getEmployeeColumns = (setSelectedEmployee: Function): ColumnDef<EmployeeInfo>[] => {
  return employeeColumnsConfig.map(column => {
    switch (column.key) {
      case "name":
      case "email":
      case "phoneNumber":
      case "jobName":
      case "employmentType":
        return { accessorKey: column.key, header: column.header };
      case "salaryAmount":
        return {
          accessorKey: column.key,
          header: column.header,
          cell: ({ getValue }) => `${getValue()?.toLocaleString()} 원`,
        };
      case "edit":
        return {
          accessorKey: column.key,
          header: column.header,
          cell: ({ row }) => (
            <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(row.original)}>
              수정
            </Button>
          ),
        };
      case "details":
        return {
          accessorKey: column.key,
          header: column.header,
          cell: ({ row }) => (
            <Link to={`/${row.original.companyCode}/datecheck/${row.original.uid}`}>
              <Button variant="default" size="sm">
                상세보기 & 정산
              </Button>
            </Link>
          ),
        };
      default:
        return { accessorKey: column.key, header: column.header };
    }
  });
};
