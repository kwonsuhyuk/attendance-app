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
  confirmPW: string; // 회원가입 폼에만 필요한 추가 필드
};

export type TLoginResponse {
  success: boolean;
  error?: string;
}

export type TSignUpResponse {
  success: boolean;
  data?: {
    userId: string;
  };
  error?: string;
}
