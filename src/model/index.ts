import { z } from "zod";
import { Control, FieldErrors } from "react-hook-form";

// 로그인 스키마 정의 (유효성 검사)
export const loginFormSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력하세요." }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

// TypeScript 타입 자동 생성
export type TLoginForm = z.infer<typeof loginFormSchema>;

type TSignupUserBase = {
  name: string;
  companyCode: string;
  phoneNumber: string;
};

export type TSignupForm = TLoginForm & TSignupUserBase;

export type TSignupUserData = TSignupUserBase & {
  id: string;
};

// 회원가입 폼에만 필요한 추가 필드
export type TSignupFormData = TSignupForm & {
  confirmPW: string;
};

export type TLoginResponse = {
  success: boolean;
  error?: string;
};

export type TSignupResponse = {
  success: boolean;
  data?: {
    userId: string;
  };
  error?: string;
};

export type TPosition = "manager" | "employee" | "";

export type TJob = {
  jobName: string;
};

export type TCompanyInfo = {
  adminName: string;
  companyLogo: string;
  companyName: string;
  holidayPay: number;
  holidayList?: string[];
  isNightPay: number;
  isdaynight: boolean;
  isholiday: boolean;
  jobName: Record<string, TJob>;
  nightEnd: number;
  nightStart: number;
  payCheckDay: number;
  qrValue: string;
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
