import { TEmpUserData } from "@/model/types/user.type";
import { getData, updateData } from ".";
import { getUserPath } from "@/constants/api.path";

export const fetchEmployees = async (companyCode: string): Promise<TEmpUserData[]> => {
  const data = await getData(`companyCode/${companyCode}/users`);

  if (data) {
    const users = Object.values(data) as TEmpUserData[];
    return users.filter(user => user.userType === "employee");
  }

  return [];
};

export async function updateEmployeeSettings(
  companyCode: string,
  userId: string,
  settings: { jobName: string; employmentType: string; salary: number },
) {
  if (!companyCode || !userId) {
    return { success: false, error: "회사 코드 또는 사용자 ID가 없습니다." };
  }

  const updatedData = {
    jobName: settings.jobName,
    employmentType: settings.employmentType,
    salaryAmount: settings.salary,
  };

  return await updateData(
    getUserPath(companyCode, userId),
    updatedData,
    "직원 설정이 성공적으로 업데이트되었습니다.",
  );
}
