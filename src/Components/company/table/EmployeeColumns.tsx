import { ColumnDef } from "@tanstack/react-table";
import { EmployeeInfo } from "@/model/types/user.type";
import { formatMoney } from "@/util/formatMoney.util";

// columns 객체를 JSON처럼 관리하고 동적으로 렌더링
export const employeeColumnsConfig = [
  { key: "name", header: "이름" },
  { key: "email", header: "이메일" },
  { key: "phoneNumber", header: "전화번호" },
  { key: "jobName", header: "직종" },
  { key: "employmentType", header: "고용 형태" },
  { key: "salaryAmount", header: "급여" },
];

export const getEmployeeColumns = (): ColumnDef<EmployeeInfo>[] => {
  return employeeColumnsConfig.map(column => ({
    accessorKey: column.key,
    header: column.header,
    cell: ({ row }) => {
      const rawValue = row.getValue(column.key);
      const value =
        column.key === "salaryAmount"
          ? String(Number(!rawValue || rawValue === "null" ? 0 : rawValue))
          : String(rawValue ?? "");

      // 컬럼별 최대 길이 설정
      const maxLengths: Record<string, number> = {
        name: 5,
        email: 12,
        phoneNumber: 13,
        employmentType: 10,
        salaryAmount: 10,
      };

      // 특정 컬럼에 대해 글자수 제한 적용
      const displayValue =
        column.key in maxLengths && value.length > maxLengths[column.key]
          ? `${value.slice(0, maxLengths[column.key])}...`
          : value;

      return (
        <div
          className={` ${column.key === "email" ? "whitespace-normal break-all" : ""} ${column.key === "salaryAmount" ? "max-x-[80px] whitespace-normal break-words" : ""} ${["name"].includes(column.key) ? "block max-w-[120px] truncate" : ""} `}
          title={value} // 툴팁으로 전체 값 표시
        >
          {column.key === "salaryAmount" ? `${formatMoney(Number(value))} 원` : displayValue}
        </div>
      );
    },
  }));
};
