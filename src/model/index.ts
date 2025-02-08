export type TLoginForm = {
  email: string;
  password: string;
};

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
