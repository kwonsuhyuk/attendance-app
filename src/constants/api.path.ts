import { TRegisteredVacation, TVacationStatus } from "@/model/types/vacation.type";

export const getCompanyPath = (companyCode: string) => `companyCode/${companyCode}`;

export const getUserPath = (companyCode: string, userId: string) =>
  `${getCompanyPath(companyCode)}/users/${userId}`;

export const getCompanyInfoPath = (companyCode: string) => `companyCode/${companyCode}/companyInfo`;

export const getUserDatePath = (companyCode: string, userId: string, date: string) =>
  `${getUserPath(companyCode, userId)}/date/${date}`;

export const getUserWorkDatePath = (companyCode: string, userId: string, date: string) =>
  `${getUserPath(companyCode, userId)}/workDates/${date}`;

// 휴가 요청 전체 목록 조회 (탭 요청용)
export const getVacationRequestListPath = (companyCode: string) =>
  `vacation/${companyCode}/requests`;

export const getRegisteredYearPath = (companyCode: string, year: string) =>
  `vacation/${companyCode}/registered/${year}`;

// 휴가 등록 전체 목록 중 특정 연도/월의 전체 사용자 조회 (통계 및 등록 탭 조회용)
export const getRegisteredMonthPath = (companyCode: string, year: string, month: string) =>
  `vacation/${companyCode}/registered/${year}/${month}`;

// 특정 사용자 등록 휴가 목록 조회 (특정 연도/월)
export const getUserRegisteredVacationsPath = (
  companyCode: string,
  year: string,
  month: string,
  userId: string,
) => `vacation/${companyCode}/registered/${year}/${month}/${userId}`;

// 특정 등록 휴가 데이터 접근 (userId + registerId로 상세 접근)
export const getRegisteredVacationDetailPath = (
  companyCode: string,
  year: string,
  month: string,
  userId: string,
  registerId: string,
) => `vacation/${companyCode}/registered/${year}/${month}/${userId}/${registerId}`;

// 출퇴근 관련 api path
export const getUserDayCommutePath = (
  companyCode: string,
  year: string,
  month: string,
  day: string,
  userId: string,
) => `attendance/${companyCode}/${year}/${month}/${day}/${userId}`;

export const getDayCommutePath = (companyCode: string, year: string, month: string, day: string) =>
  `attendance/${companyCode}/${year}/${month}/${day}`;
