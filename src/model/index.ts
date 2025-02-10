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

// 회원가입 가입 포지션
export type TPosition = "manager" | "employee" | "";

export type TPositionSelectorProps = {
  position: TPosition;
  onPositionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
// 관리자 선택시
export type TManagerConfirmationProps = {
  isManagerCheck: boolean;
  setManagerCheck: (checked: boolean) => void;
};
// 직원 선택시
export interface TEmployeeCompanyFormProps {
  control: Control<TSignupFormData>;
  errors: FieldErrors<TSignupFormData>;
  isCodeValid: boolean;
  tempCompInfo: string;
  companyCode: string | undefined;
  checkCompanyCode: (code: string) => Promise<void>;
}

// 가입 정보
export interface TPersonalInfoFormProps {
  control: Control<TSignupFormData>;
  errors: FieldErrors<TSignupFormData>;
  password: string;
}

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
