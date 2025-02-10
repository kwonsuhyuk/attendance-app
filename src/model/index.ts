export type TLoginForm = {
  email: string;
  password: string;
};

type TUserBase = {
  name: string;
  companyCode: string;
  phoneNumber: string;
};

export type TSignUpForm = TLoginForm & TUserBase;

export type TUserData = TUserBase & {
  id: string;
};

export type TSignUpFormData = TSignUpForm & {
  confirmPW: string;
};
// 회원가입 폼에만 필요한 추가 필드

export type TJob = {
  jobName: string;
};

export type TCompanyInfo = {
  adminName: string;
  companyLogo: string;
  companyName: string;
  holidayPay: number;
  isNightPay: number;
  isdaynight: boolean;
  isholiday: boolean;
  jobName: Record<string, TJob>;
  nightEnd: number;
  nightStart: number;
  payCheckDay: number;
  qrValue: string;
};

export type TLoginResponse = {
  success: boolean;
  error?: string;
};

export type TSignUpResponse = {
  success: boolean;
  data?: {
    userId: string;
  };
  error?: string;
};

// 날짜별 근무 시간 타입
export type WorkTime = {
  startTime?: string;
  endTime?: string;
};

// 날짜별 근무 데이터 타입
export type WorkData = {
  daySalary: number;
  holidayAndWeekendSalary: number;
  nightSalary: number;
  workHour: number;
};

// 날짜 맵 타입 (키는 날짜 문자열, 값은 WorkTime 또는 WorkData)
export type DateMap<T> = {
  [date: string]: T;
};

// 사용자 데이터 타입
export type UserData = {
  companyCode: string;
  date: DateMap<WorkTime>;
  email: string;
  jobName: string;
  name: string;
  phoneNumber: string;
  salaryAmount: number;
  salaryType: string;
  uid: string;
  userType: string;
  workDates: DateMap<WorkData>;
};
