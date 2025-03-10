import { PAYMENT_METHODS } from "@/constants/employmentType";

export type TSalaryType = keyof typeof PAYMENT_METHODS;

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
