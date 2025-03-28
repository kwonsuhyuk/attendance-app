import { IVacationRequest } from "@/components/company/table/VacationColumns";

export const TAB_ITEMS = [
  { value: "pending", label: "대기중" },
  { value: "processed", label: "처리 내역" },
  { value: "registered", label: "등록 내역" },
] as const;

export const TAB_CONTENTS = [
  {
    value: "pending",
    filter: (req: IVacationRequest) => req.status === "대기중",
    includeActions: true,
    isRegistered: false,
  },
  {
    value: "processed",
    filter: (req: IVacationRequest) => req.status === "승인" || req.status === "거절",
    includeActions: false,
    isRegistered: false,
  },
  {
    value: "registered",
    filter: (_: IVacationRequest) => true,
    includeActions: false,
    isRegistered: true,
  },
] as const;
