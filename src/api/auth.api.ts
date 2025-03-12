import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/index";
import { TLoginResponse, TSignupResponse } from "@/model/types/api.type";
import { TLoginForm } from "@/model/types/authTypes/login.type";
import { TSignupFormData } from "@/model/types/authTypes/signup.type";
import { getData, setData } from ".";
import { TCompanyInfo } from "@/model/types/company.type";
import { encrypt } from "@/util/encryptDecrypt.util";
import { TCMUserData, TEmpUserData } from "@/model/types/user.type";
import { getCompanyPath, getUserPath } from "@/constants/api.path";
import { companyFormSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { z } from "zod";

export async function login({ email, password }: TLoginForm): Promise<TLoginResponse> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function signup({
  email,
  password,
  name,
  companyCode,
}: TSignupFormData): Promise<TSignupResponse> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name,
      photoURL: companyCode,
    });
    return {
      success: true,
      data: { userId: user.uid },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function validateCompanyCode(code: string) {
  try {
    const companyCodeData = await getData(getCompanyPath(code));

    if (companyCodeData?.companyInfo?.companyName) {
      return { isValid: true, companyName: companyCodeData.companyInfo.companyName };
    }

    return { isValid: false, error: "일치하는 회사가 없습니다." };
  } catch (error: any) {
    return { isValid: false, error: error.message };
  }
}

export async function setEmployeeUser({
  name,
  uid,
  email,
  phoneNumber,
  companyCode,
  jobName,
  employmentType,
}: TEmpUserData) {
  const userData = {
    name,
    uid,
    email,
    phoneNumber,
    companyCode,
    jobName,
    employmentType,
    userType: "employee",
  };

  return await setData(
    getUserPath(companyCode, uid),
    userData,
    "직원이 성공적으로 등록되었습니다.",
  );
}

export async function setCompanyAndManagerData({
  formData,
  userId,
  companyCode,
  name,
  email,
  phoneNumber,
}: {
  formData: z.infer<typeof companyFormSchema>;
  userId: string;
  companyCode: string;
  name: string;
  email: string;
  phoneNumber?: string;
}) {
  if (!companyCode || !userId) {
    return { success: false, error: "회사 코드 또는 사용자 ID가 없습니다." };
  }

  const companyData: TCompanyInfo = {
    companyName: formData.companyBasic.companyName,
    adminName: formData.companyBasic.adminName,
    companyLogo: formData.companyBasic.companyLogo || "",
    companyIntro: formData.companyBasic.companyIntro,
    isDayNight: formData.companyNightHoliday.isDayNight,
    nightStart: Number(formData.companyNightHoliday.nightStart) || 0,
    nightEnd: Number(formData.companyNightHoliday.nightEnd) || 0,
    payCheckDay: Number(formData.companyNightHoliday.payCheckDay) || 1,
    isNightPay: formData.companyNightHoliday.nightPay!,
    isHoliday: formData.companyNightHoliday.isHoliday,
    holidayPay: formData.companyNightHoliday.holidayPay!,
    holidayList: formData.companyNightHoliday.holidayList || [],
    jobList: formData.companyJobList.companyJobs || [],
    companyCode,
    qrValue: encrypt(companyCode),
    workPlacesList: formData.companyWorkPlacesList.companyWorkPlaces,
  };

  const userData: TCMUserData = {
    name: name!,
    uid: userId,
    email: email!,
    phoneNumber: phoneNumber || "",
    userType: "manager",
    companyCode,
  };

  // 회사 정보 및 관리자 정보 저장
  const companyResult = await setData(`${getCompanyPath(companyCode)}/companyInfo`, companyData);
  const userResult = await setData(getUserPath(companyCode, userId), userData);

  if (companyResult.success && userResult.success) {
    return { success: true, message: "회사 및 관리자 정보가 성공적으로 설정되었습니다." };
  }

  return { success: false, error: companyResult.error || userResult.error };
}
