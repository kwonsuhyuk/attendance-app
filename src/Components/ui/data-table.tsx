import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({ columns, data, onRowClick }: DataTableProps<TData>) {
  const [pageSize, setPageSize] = useState(window.innerWidth < 640 ? 8 : 10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = window.innerWidth < 640 ? 8 : 10;
      setPageSize(newPageSize);
      table.setPageSize(newPageSize); // 📌 여기서 pageSize 업데이트 적용
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [table]);

  const getColumnKey = (col: ColumnDef<TData>) =>
    (col as { accessorKey?: string }).accessorKey || "";

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="mb-5 w-full table-auto md:table-auto">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isHiddenOnMobile = ["email", "phoneNumber", "salaryAmount"].includes(
                  header.column.id,
                );

                return (
                  <TableHead
                    key={header.id}
                    className={`p-5 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => {
                  const isHiddenOnMobile = ["email", "phoneNumber", "salaryAmount"].includes(
                    cell.column.id,
                  );
                  return (
                    <TableCell
                      key={cell.id}
                      className={`p-3 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="w-full p-5 text-center text-gray-500">
                결과 없음
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
