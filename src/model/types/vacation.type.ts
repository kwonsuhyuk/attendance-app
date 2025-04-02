import { TJobList, TSelectableJobName } from "./company.type";
import { TUserBase } from "./user.type";

export type TVacationType = "반차" | "연차" | "특별";
export type TVacationStatus = "대기중" | "승인" | "거절" | "자동 승인";

// 휴가 요청 타입
export type TVacationRequest<T extends TJobList = TJobList> = {
  requestId: string;
  requester: Pick<TUserBase, "uid" | "name" | "email"> & { jobName: TSelectableJobName<T> };
  vacationType: TVacationType;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  reason: string;
  status: Exclude<TVacationStatus, "자동 승인됨">; // "대기중" | "승인됨" | "거절됨"
  createdAt: string; // ISO 문자열 (저장은 문자열로, 필요시 date로 객체 변환)
  processedAt?: string; // 처리된 시간 (승인/거절 시점)
};

// 등록된 휴가 타입
export type TRegisteredVacation<T extends TJobList = TJobList> = {
  registerId: string;
  startDate: string;
  endDate: string;
  vacationType: TVacationType;
  status: "자동 승인됨";
  reason: string;
  createdAt: string;
} & Pick<TUserBase, "name" | "email"> & {
    jobName: TSelectableJobName<T>;
  };
