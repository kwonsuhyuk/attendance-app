import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { twMerge } from "tailwind-merge";

interface IUserInfoTableProps {
  rows: { label: string; value: string | number }[];
  className?: string;
}

const UserInfoTable = ({ rows, className }: IUserInfoTableProps) => {
  return (
    <div className={twMerge("overflow-hidden rounded-lg border border-gray-200", className)}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-black">{row.label}</TableCell>
              <TableCell className="max-w-[200px] overflow-hidden truncate whitespace-nowrap text-gray-700">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserInfoTable;
