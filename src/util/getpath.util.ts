import { getUserDayCommutePath } from "@/constants/api.path";

export function getDatePath(date: Date, companyCode: string, userId: string): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return getUserDayCommutePath(companyCode, year, month, day, userId);
}
