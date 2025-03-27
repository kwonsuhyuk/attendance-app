import { getData, setData, updateData } from "./index";
import { TVacationRequest, TRegisteredVacation } from "@/model/types/vacation.type";
import {
  getRegisteredMonthPath,
  getRegisteredVacationDetailPath,
  getVacationRequestListPath,
} from "@/constants/api.path";

// 휴가 요청
export const createVacationRequest = (
  companyCode: string,
  requestId: string,
  data: TVacationRequest,
) => {
  const path = `${getVacationRequestListPath(companyCode)}/${requestId}`;
  return setData(path, data, "휴가 요청이 등록되었습니다.");
};

// 휴가 요청 조회 (추후 기능 추가 예정)
export const fetchVacationRequests = (companyCode: string) => {
  const path = getVacationRequestListPath(companyCode);
  return getData<Record<string, TVacationRequest>>(path);
};

// 휴가 요청 상태 업데이트
export const updateVacationRequestStatus = (
  companyCode: string,
  requestId: string,
  status: "승인됨" | "거절됨",
  processedAt: string = new Date().toISOString(),
) => {
  const path = `${getVacationRequestListPath(companyCode)}/${requestId}`;
  return updateData(path, { status, processedAt }, "요청 상태가 업데이트되었습니다.");
};

// 휴가 등록
export const registerVacation = (
  companyCode: string,
  year: string,
  month: string,
  userId: string,
  registerId: string,
  data: TRegisteredVacation,
) => {
  const path = getRegisteredVacationDetailPath(companyCode, year, month, userId, registerId);
  return setData(path, data, "휴가가 등록되었습니다.");
};

// 휴가 등록 내역 조회
export const fetchVacationRegistered = async (
  companyCode: string,
): Promise<TRegisteredVacation[]> => {
  const resultMap = new Map<string, TRegisteredVacation>();
  const tempDate = new Date();
  tempDate.setDate(1); // 정확히 그 달로 맞추기 (예: 3월 31 → 3월 1)

  for (let i = 0; i < 6; i++) {
    const year = String(tempDate.getFullYear());
    const month = String(tempDate.getMonth() + 1).padStart(2, "0");
    const path = getRegisteredMonthPath(companyCode, year, month);

    console.log("📂 조회 경로:", path);

    const monthData = await getData<Record<string, Record<string, TRegisteredVacation>>>(path);
    console.log("📦 monthData:", monthData);

    if (monthData) {
      Object.values(monthData).forEach(userVacations => {
        Object.entries(userVacations).forEach(([registerId, vacation]) => {
          if (!resultMap.has(registerId)) {
            resultMap.set(registerId, vacation);
          }
        });
      });
    }

    tempDate.setMonth(tempDate.getMonth() - 1); // 한 달 전으로 이동
  }

  return Array.from(resultMap.values());
};
