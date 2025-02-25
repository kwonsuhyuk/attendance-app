import { TJobList, TEmpUserData, TCMUserData, TCompanyInfo } from "..";

export type TLoginResponse<T extends TJobList = TJobList> = {
  success: boolean;
  data?: {
    user: TEmpUserData<T> | TCMUserData;
    company: TCompanyInfo;
  };
  error?: string;
};

export type TSignupResponse = {
  success: boolean;
  data?: {
    userId: string;
  };
  error?: string;
};
