import { getData, setData, updateData } from "./index";
import { TVacationRequest, TRegisteredVacation } from "@/model/types/vacation.type";
import {
  getRegisteredMonthPath,
  getRegisteredVacationDetailPath,
  getRegisteredYearPath,
  getVacationRequestListPath,
} from "@/constants/api.path";

// 휴가 요청 (현재 사용 x, 추후 기능 추가 예정)
export const createVacationRequest = (
  companyCode: string,
  requestId: string,
  data: TVacationRequest,
) => {
  const path = `${getVacationRequestListPath(companyCode)}/${requestId}`;
  return setData(path, data, "휴가 요청이 등록되었습니다.");
};

// 휴가 요청 조회 (현재 사용 x, 추후 기능 추가 예정)
export const fetchVacationRequests = (companyCode: string) => {
  const path = getVacationRequestListPath(companyCode);
  return getData<Record<string, TVacationRequest>>(path);
};

// 휴가 요청 상태 업데이트 (현재 사용 x, 추후 기능 추가 예정)
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
  const baseDate = new Date();
  baseDate.setDate(1);

  for (let i = -6; i <= 3; i++) {
    const targetDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i);
    const year = String(targetDate.getFullYear());
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");

    const path = getRegisteredMonthPath(companyCode, year, month);

    const monthData = await getData<Record<string, Record<string, TRegisteredVacation>>>(path);

    if (monthData) {
      Object.values(monthData).forEach(userVacations => {
        Object.entries(userVacations).forEach(([registerId, vacation]) => {
          if (!resultMap.has(registerId)) {
            resultMap.set(registerId, vacation);
          }
        });
      });
    }
  }

  return Array.from(resultMap.values());
};

// 연도 전체 조회 (유저별 구조)
export async function fetchRegisteredVacationsByYear(
  companyCode: string,
  year: string,
): Promise<Record<string, Record<string, TRegisteredVacation>> | null> {
  const path = getRegisteredYearPath(companyCode, year);
  return await getData(path);
}

// 연월 전체 조회 (유저별 구조)
export async function fetchRegisteredVacationsByMonth(
  companyCode: string,
  year: string,
  month: string,
): Promise<Record<string, Record<string, TRegisteredVacation>> | null> {
  const path = getRegisteredMonthPath(companyCode, year, month.padStart(2, "0"));

  return await getData(path);
}
