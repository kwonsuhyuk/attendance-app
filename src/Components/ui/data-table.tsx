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
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="mb-4 w-full max-w-screen-sm table-fixed sm:max-w-full sm:table-auto">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isHiddenOnMobile = [
                  "email",
                  "phoneNumber",
                  "jobName",
                  "employmentType",
                  "salaryAmount",
                ].includes(header.column.id);

                return (
                  <TableHead
                    key={header.id}
                    className={`p-1 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => {
                  const isHiddenOnMobile = [
                    "email",
                    "phoneNumber",
                    "jobName",
                    "employmentType",
                    "salaryAmount",
                  ].includes(cell.column.id);
                  return (
                    <TableCell
                      key={cell.id}
                      className={`p-2 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                데이터 없음
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
