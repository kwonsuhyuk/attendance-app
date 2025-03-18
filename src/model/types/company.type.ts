import { EmployeeInfo } from "./user.type";

// 직무 타입
export type TJob = {
  id: string;
  name: string;
};

export type TJobList = TJob[];

// 근무지 타입
export type TWorkPlace = {
  id: string;
  name: string;
  memo: string;
  address: string;
  lat: number;
  lng: number;
};

export type TworkPlacesList = TWorkPlace[];

// 회사 정보 타입
export type TCompanyInfo = {
  adminName: string;
  companyLogo: string;
  companyName: string;
  companyIntro: string;
  holidayPay: number;
  holidayList?: string[];
  nightPay: number;
  isDayNight: boolean;
  isHoliday: boolean;
  jobList: TJobList;
  nightEnd: string;
  nightStart: string;
  payCheckDay: string;
  qrValue: string;
  companyCode: string;
  workPlacesList: TworkPlacesList;
};

// 직무 이름 선택 타입
export type TSelectableJobName<T extends TJobList> = T[number]["name"] | "선택안함";
