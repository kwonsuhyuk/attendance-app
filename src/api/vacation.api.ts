import { getData, setData } from "./index";
import { TVacationRequest, TRegisteredVacation } from "@/model/types/vacation.type";
import { getRegisteredVacationDetailPath, getVacationRequestListPath } from "@/constants/api.path";

// 휴가 요청
export const createVacationRequest = (
  companyCode: string,
  requestId: string,
  data: TVacationRequest,
) => {
  const path = `${getVacationRequestListPath(companyCode)}/${requestId}`;
  return setData(path, data, "휴가 요청이 등록되었습니다.");
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

// 휴가 요청 전체 조회
export const fetchVacationRequests = (companyCode: string) => {
  const path = getVacationRequestListPath(companyCode);
  return getData<Record<string, TVacationRequest>>(path);
};
