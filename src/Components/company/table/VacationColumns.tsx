import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export interface IVacationRequest {
  id: number;
  requestType: string;
  requester: string;
  requestDate: string;
  reason: string;
  status: "대기중" | "승인" | "거절" | "자동 승인";
  email?: string;
}

// 상태 배지 컴포넌트
export const StatusBadge = ({ status }: { status: "대기중" | "승인" | "거절" | "자동 승인" }) => {
  const statusColors = {
    대기중: "bg-yellow-500",
    승인: "bg-green-500",
    거절: "bg-red-500",
    "자동 승인": "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-1 py-1 text-sm font-semibold text-white ${statusColors[status] || ""} h-[28px] min-w-[65px] whitespace-nowrap`}
    >
      {status}
    </span>
  );
};

// 승인/거절 버튼 컴포넌트
const ActionButtons = ({
  id,
  handleApprove,
  handleReject,
}: {
  id: number;
  handleApprove: (id: number) => void;
  handleReject: (id: number) => void;
}) => {
  return (
    <div className="flex min-w-[100px] justify-center space-x-2 sm:min-w-[60px] sm:flex-col sm:space-x-0 sm:space-y-1 md:min-w-[100px] md:flex-row md:space-x-2 md:space-y-0">
      <Button
        variant="default"
        size="sm"
        className="w-full bg-green-500 hover:bg-green-600 sm:w-auto"
        onClick={() => handleApprove(id)}
      >
        승인
      </Button>
      <Button
        variant="default"
        size="sm"
        className="w-full bg-red-500 hover:bg-red-600 sm:w-auto"
        onClick={() => handleReject(id)}
      >
        거절
      </Button>
    </div>
  );
};

// 컬럼 정의 (관리 컬럼 포함 여부 옵션 추가)
export const getVacationColumns = (
  handleApprove?: (id: number) => void,
  handleReject?: (id: number) => void,
  includeActions: boolean = true,
  isRegistered: boolean = false,
): ColumnDef<IVacationRequest>[] => {
  const columns: ColumnDef<IVacationRequest>[] = [
    {
      accessorKey: "requestType",
      header: "휴가 유형",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "requester",
      header: "휴가자",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "requestDate",
      header: "휴가 일자",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "reason",
      header: "사유",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        const maxLength = 10;
        const displayText = value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;

        return (
          <span
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ display: "inline-block", maxWidth: "180px" }}
            title={value} // 마우스를 올리면 전체 텍스트 표시
          >
            {displayText}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "상태",
      cell: ({ row }) => (
        <StatusBadge
          status={isRegistered ? "자동 승인" : (row.original.status as IVacationRequest["status"])}
        />
      ),
    },
  ];
  return columns;
};
