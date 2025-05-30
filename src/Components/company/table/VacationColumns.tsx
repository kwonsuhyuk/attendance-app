import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export interface IVacationRequest {
  id: string;
  requestType: string;
  requester: {
    name: string;
    email: string;
    uid?: string;
    jobName?: string;
  };
  requestDate: string;
  reason: string;
  status: "대기중" | "승인" | "거절" | "자동승인";
  email?: string;
  processedAt?: string;
}

// 상태 배지 컴포넌트
export const StatusBadge = ({ status }: { status: "대기중" | "승인" | "거절" | "자동승인" }) => {
  const statusColors = {
    대기중: "bg-yellow-500",
    승인: "bg-green-500",
    거절: "bg-red-500",
    자동승인: "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-sm font-semibold text-white ${statusColors[status] || ""} h-[24px] min-w-[60px] whitespace-nowrap`}
    >
      {status}
    </span>
  );
};

// 컬럼 정의 (관리 컬럼 포함 여부 옵션 추가)
export const getVacationColumns = ({
  onApprove,
  onReject,
  includeActions = true,
  isRegistered = false,
}: {
  onApprove?: (id: string) => void | Promise<void>;
  onReject?: (id: string) => void | Promise<void>;
  includeActions?: boolean;
  isRegistered?: boolean;
}): ColumnDef<IVacationRequest>[] => {
  const columns: ColumnDef<IVacationRequest>[] = [
    {
      accessorKey: "requestType",
      header: "휴가 유형",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      header: "휴가자",
      accessorFn: row => row.requester.name,
      id: "requester",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "requestDate",
      header: "휴가 일자",
      cell: ({ getValue }) => {
        const value = getValue() as string;

        if (value.includes("~")) {
          const [from, to] = value.split(" ~ ");
          return from === to ? <span>{from}</span> : <span>{value}</span>;
        }

        return <span>{value}</span>;
      },
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
          status={isRegistered ? "자동승인" : (row.original.status as IVacationRequest["status"])}
        />
      ),
    },
  ];
  return columns;
};
