import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type VacationRequest = {
  id: number;
  requestType: string;
  requester: string;
  requestDate: string;
  reason: string;
  status: "대기중" | "승인됨" | "거절됨";
};

const StatusBadge = ({ status }: { status: "대기중" | "승인됨" | "거절됨" }) => {
  const statusColors: Record<"대기중" | "승인됨" | "거절됨", string> = {
    대기중: "bg-yellow-500",
    승인됨: "bg-green-500",
    거절됨: "bg-red-500",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-sm text-white ${statusColors[status]}`}>
      {status}
    </span>
  );
};

// 승인/거절 버튼 컴포넌트
const ActionButtons = ({
  id,
  status,
  handleApprove,
  handleReject,
}: {
  id: number;
  status: "대기중" | "승인됨" | "거절됨";
  handleApprove: (id: number) => void;
  handleReject: (id: number) => void;
}) => {
  return status === "대기중" ? (
    <div className="flex space-x-2">
      <Button
        variant="default"
        size="sm"
        className="bg-green-500 hover:bg-green-600"
        onClick={() => handleApprove(id)}
      >
        승인
      </Button>
      <Button variant="destructive" size="sm" onClick={() => handleReject(id)}>
        거절
      </Button>
    </div>
  ) : (
    <span className="text-gray-500">처리 완료</span>
  );
};

// 컬럼 정의 (TSX 형식)
export const getVacationColumns = (
  handleApprove: (id: number) => void,
  handleReject: (id: number) => void,
): ColumnDef<VacationRequest>[] => [
  {
    accessorKey: "requestType",
    header: "요청 유형",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "requester",
    header: "요청자",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "requestDate",
    header: "요청 일자",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "reason",
    header: "사유",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => <StatusBadge status={getValue() as "대기중" | "승인됨" | "거절됨"} />,
  },
  {
    accessorKey: "actions",
    header: "관리",
    cell: ({ row }) => (
      <ActionButtons
        id={row.original.id}
        status={row.original.status}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    ),
  },
];
