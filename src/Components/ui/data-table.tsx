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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="h-[580px] min-h-[550px] overflow-x-auto rounded-md border">
      <Table className="min-w-2xl h-full w-full table-auto md:table-fixed">
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
                    className={`whitespace-nowrap pl-5 pr-5 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
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
                className="cursor-pointer hover:bg-white-bg dark:hover:bg-dark-border-sub"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => {
                  const isHiddenOnMobile = ["email", "phoneNumber", "salaryAmount"].includes(
                    cell.column.id,
                  );
                  return (
                    <TableCell
                      key={cell.id}
                      className={`break-words p-3 text-center ${isHiddenOnMobile ? "hidden sm:table-cell" : ""}`}
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
                결과 없음
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
