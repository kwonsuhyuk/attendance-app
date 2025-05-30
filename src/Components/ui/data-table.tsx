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
import { twMerge } from "tailwind-merge";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  selectedItem?: TData | null;
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  selectedItem,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="h-[500px] rounded-md border">
      <Table className="min-w-2xl h-full w-full table-auto md:table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              className="border-y border-solid border-white-table-header dark:border-dark-table-header"
            >
              {headerGroup.headers.map(header => {
                const isHiddenOnMobile = ["email", "phoneNumber", "salaryAmount"].includes(
                  header.column.id,
                );

                return (
                  <TableHead
                    key={header.id}
                    className={`whitespace-nowrap border text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
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
                className={twMerge(
                  "cursor-pointer hover:bg-white-bg dark:hover:bg-dark-border-sub",
                  selectedItem?.email === (row.original as any).email
                    ? "border border-solid border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                    : "",
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => {
                  const isHiddenOnMobile = ["email", "phoneNumber", "salaryAmount"].includes(
                    cell.column.id,
                  );
                  return (
                    <TableCell
                      key={cell.id}
                      className={`break-words text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="h-[500px]">
              <TableCell colSpan={columns.length} className="w-full p-5 text-center text-lg">
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
