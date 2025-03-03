import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import EmployeeItem from "@/components/company/EmployeeItem";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import darkModeStore from "@/store/darkmode.store";
import { useUserStore } from "@/store/user.store";
import { child, get, getDatabase, ref } from "firebase/database";
import { TEmployee, TSalaryType } from "@/model/types/manager.type";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";

const EmployeeListPage = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<TEmployee[]>([]);
  const [companyData, setCompanyData] = useState<{ jobName: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedJob, setSelectedJob] = useState("전체");
  const [selectedSalaryType, setSelectedSalaryType] = useState("전체");
  const darkMode = darkModeStore(state => state.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const snapshot = await get(
        child(ref(getDatabase()), `companyCode/${companyCode}/companyInfo/jobName`),
      );
      setCompanyData(
        snapshot.val() ? (Object.values(snapshot.val()) as { jobName: string }[]) : [],
      );
      setIsLoading(false);
    }
    getData();
  }, [companyCode]);

  useEffect(() => {
    async function getEmployeeInfo() {
      setIsLoading(true);
      const snapshot = await get(child(ref(getDatabase()), `companyCode/${companyCode}/users`));

      const employees = snapshot.val()
        ? (Object.values(snapshot.val()).map(emp => {
            const typedEmp = emp as unknown as TEmployee;
            return {
              ...typedEmp,
              companyCode: companyCode,
              salaryType: Object.keys(PAYMENT_METHODS).includes(typedEmp.salaryType)
                ? (typedEmp.salaryType as TSalaryType)
                : "monthlyPay", // 🔥 안전한 기본값 설정
            };
          }) as TEmployee[])
        : [];

      setEmployeeList(employees);
      setIsLoading(false);
    }
    getEmployeeInfo();
  }, [companyCode]);

  // ✅ 필터링 적용된 직원 리스트
  const filteredEmployees = employeeList.filter(
    emp =>
      emp.name.includes(searchName) &&
      (selectedJob === "전체" || emp.jobName === selectedJob) &&
      (selectedSalaryType === "전체" || emp.salaryType === selectedSalaryType),
  );

  // ✅ DataTable 컬럼 정의
  const columns: ColumnDef<TEmployee>[] = [
    { accessorKey: "name", header: "이름" },
    { accessorKey: "email", header: "이메일" },
    { accessorKey: "phone", header: "전화번호" },
    { accessorKey: "jobName", header: "직종" },
    { accessorKey: "salaryType", header: "급여 지급 방식" },
    { accessorKey: "salary", header: "급여" },
    {
      id: "edit",
      header: "직원 정보 수정",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">수정</Button>
          </DialogTrigger>
          <DialogContent>
            <EmployeeItem user={row.original} />
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "view",
      header: "상세보기 & 정산",
      cell: ({ row }) => (
        <Button
          variant="link"
          onClick={() => navigate(`/${companyCode}/datecheck/${row.original.uid}`)}
        >
          상세보기 & 정산 {">"}
        </Button>
      ),
    },
  ];

  // ✅ React-Table 인스턴스 생성
  const table = useReactTable({
    data: filteredEmployees, // 검색 및 필터링 반영
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="relative my-10 h-[calc(100vh-18rem)]">
      {/* 검색 & 필터 UI */}
      <div className="mb-5 flex flex-wrap gap-4">
        <Input
          value={searchName}
          placeholder="직원 검색"
          onChange={e => setSearchName(e.target.value)}
          className="w-[200px]"
        />

        {/* 직종 필터 */}
        <Select onValueChange={setSelectedJob} defaultValue={selectedJob}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="직종 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            {companyData.map((el, index) => (
              <SelectItem key={index} value={el.jobName}>
                {el.jobName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 급여 지급 방식 필터 */}
        <Select onValueChange={setSelectedSalaryType} defaultValue={selectedSalaryType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="급여 지급 방식" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            <SelectItem value="monthlyPay">월급 지급</SelectItem>
            <SelectItem value="dailyPay">일당 지급</SelectItem>
            <SelectItem value="hourPay">시급 지급</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSelectedJob("전체");
            setSelectedSalaryType("전체");
            setSearchName("");
          }}
        >
          초기화
        </Button>
      </div>

      {/* 테이블 렌더링 */}
      <div className="overflow-auto rounded-lg border border-gray-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeListPage;
