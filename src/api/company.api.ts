import { TCompanyInfo, TJobList, TworkPlacesList } from "@/model/types/company.type";
import { updateData } from ".";
import { getCompanyInfoPath } from "@/constants/api.path";

export const updateCompanyBasicInfo = async (companyCode: string, data: Partial<TCompanyInfo>) => {
  if (!companyCode) return { success: false, error: "회사 코드가 없습니다." };

  return await updateData(
    getCompanyInfoPath(companyCode),
    {
      companyName: data.companyName,
      adminName: data.adminName,
      companyIntro: data.companyIntro,
      companyLogo: data.companyLogo,
    },
    "회사 정보 변경이 완료되었습니다.",
  );
};

export const updateCompanyJobList = async (companyCode: string, jobList: TJobList) => {
  if (!companyCode) return { success: false, error: "회사 코드가 없습니다." };

  return await updateData(
    getCompanyInfoPath(companyCode),
    { jobList },
    "직무 목록이 성공적으로 업데이트되었습니다.",
  );
};

export const updateCompanyNightHolidayInfo = async (
  companyCode: string,
  nightHolidayData: Partial<TCompanyInfo>,
) => {
  if (!companyCode) return { success: false, error: "회사 코드가 없습니다." };

  const formattedData: Partial<TCompanyInfo> = {
    ...nightHolidayData,
    nightEnd: Number(nightHolidayData.nightEnd),
    nightStart: Number(nightHolidayData.nightStart),
    payCheckDay: Number(nightHolidayData.payCheckDay),
  };

  return await updateData(
    getCompanyInfoPath(companyCode),
    formattedData,
    "야간 및 공휴일 설정이 성공적으로 업데이트되었습니다.",
  );
};

export const updateCompanyWorkPlacesList = async (
  companyCode: string,
  workPlacesList: TworkPlacesList,
) => {
  if (!companyCode) return { success: false, error: "회사 코드가 없습니다." };

  return await updateData(
    getCompanyInfoPath(companyCode),
    { workPlacesList },
    "근무지 목록이 성공적으로 업데이트되었습니다.",
  );
};
