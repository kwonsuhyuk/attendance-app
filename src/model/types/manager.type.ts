import { EMPLOYMENT_TYPE } from "@/constants/employmentType";

export type TSalaryType = keyof typeof EMPLOYMENT_TYPE;

export type TEmployee = {
  uid: string;
  name: string;
  jobName: string;
  salaryType: TSalaryType;
  userType: string;
  email?: string;
  phone?: string;
  salary?: number;
  companyCode: string;
};

export type TNotice = {
  title: string;
  content: string;
  createdAt: string;
};
