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
  isNightPay: number;
  isDayNight: boolean;
  isHoliday: boolean;
  jobList: TJobList;
  nightEnd: number;
  nightStart: number;
  payCheckDay: number;
  qrValue: string;
  workPlacesList: TworkPlacesList;
};

// 직무 이름 선택 타입
export type TSelectableJobName<T extends TJobList> = T[number]["name"] | "선택안함";
