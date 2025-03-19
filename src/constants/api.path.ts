import { TVacationStatus } from "@/model/types/vacation.type";

export const getCompanyPath = (companyCode: string) => `companyCode/${companyCode}`;

export const getUserPath = (companyCode: string, userId: string) =>
  `${getCompanyPath(companyCode)}/users/${userId}`;

export const getCompanyInfoPath = (companyCode: string) => `companyCode/${companyCode}/companyInfo`;

export const getUserDatePath = (companyCode: string, userId: string, date: string) =>
  `${getUserPath(companyCode, userId)}/date/${date}`;

export const getUserWorkDatePath = (companyCode: string, userId: string, date: string) =>
  `${getUserPath(companyCode, userId)}/workDates/${date}`;
