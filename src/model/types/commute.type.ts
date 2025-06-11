import { TEmpUserData, TUserBase } from "./user.type";

// 출근 일시
export type TStartCommutePayload = {
  startTime: string;
  startWorkplaceId: string;
};

// 외근 출근
export type TStartOutWorkingPayload = {
  startWorkplaceId: "외근";
  outworkingMemo: string;
  startTime: string;
};

// 외근 퇴근
export type TEndOutwokingPayload = {
  endWorkplaceId: "외근";
  outworkingMemo: string;
  endTime: string;
};

// 퇴근일시
export type TEndCommutePayload = {
  endTime: string;
  endWorkplaceId: string;
};

export type TCommuteData = Partial<
  TStartCommutePayload &
    TEndCommutePayload &
    TStartOutWorkingPayload &
    TEndOutwokingPayload &
    TOutworkRequest
>;

export type TProcessedCommuteResult = {
  success: boolean;
  message?: string;
  error?: string;
  newStatus?: TCommuteStatus;
};

export type TCommuteStatus =
  | "not-checked-in" // 아직 출근 안 한 상태
  | "checked-in-only" // 출근은 했고, 퇴근은 안 한 상태
  | "checked-in-and-out" // 출퇴근 모두 완료
  | "out-working" // 외근
  | "out-working-checking" // 외근 요청 대기
  | "missing-check-in"; // 퇴근만 있고 출근 기록 없음 (비정상 케이스)

export type TCalendarDayInfo = {
  day: number;
  summary: {
    출근: number;
    외근: number;
    휴가: number;
    총원: number;
  };
  isHoliday?: boolean;
  isCompanyHoliday?: boolean;
  checkIn?: {
    time: string;
    workplace: string;
  };
  checkOut?: {
    time: string;
    workplace: string;
  };
};

export type TCommuteRecord = {
  userId: string;
  startTime?: string;
  startWorkplaceId?: string;
  endTime?: string;
  outworkingMemo?: string;
  endWorkplaceId?: string;
  userInfo?: TEmpUserData;
};

export type TOutworkRequest = {
  requester: TEmpUserData;
  outworkingMemo: string;
  requestTime: string;
  isCheckout: boolean;
  status: TCommuteStatus;
};

export type TOutworkRequestWithId = TOutworkRequest & { id: string };
