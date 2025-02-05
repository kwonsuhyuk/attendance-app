export type TLoginForm = {
  email: string;
  password: string;
};

export type TUserBase = {
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
