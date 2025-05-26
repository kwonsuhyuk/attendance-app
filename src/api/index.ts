import { get, set, getDatabase, ref, update, onValue, off } from "firebase/database";
import "@/firebase";
import { getCompanyInfoPath } from "@/constants/api.path";

export const db = getDatabase();

export async function getData<T>(path: string): Promise<T | null> {
  try {
    const snapshot = await get(ref(db, path));
    return snapshot.exists() ? (snapshot.val() as T) : null;
  } catch (error: any) {
    console.error(`Error fetching data from ${path}:`, error);
    return null;
  }
}

/**
 * Firebase 데이터 저장 함수
 * @param path 저장할 Firebase 경로
 * @param data 저장할 데이터 (유형을 제네릭으로 설정)
 * @param message 성공 시 반환할 메시지 (선택 사항)
 * @returns 성공 또는 실패 응답 객체
 */
export async function setData<T>(
  path: string,
  data: T,
  message?: string,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    await set(ref(db, path), data);
    return { success: true, message: message || "데이터가 성공적으로 저장되었습니다." };
  } catch (error: any) {
    console.error(`Error setting data to ${path}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Firebase 데이터 업데이트 함수
 * @param path 업데이트할 Firebase 경로
 * @param data 업데이트할 데이터 (유형을 제네릭으로 설정)
 * @param message 성공 시 반환할 메시지 (선택 사항)
 * @returns 성공 또는 실패 응답 객체
 */
export async function updateData<T>(
  path: string,
  data: Partial<T>,
  message?: string,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    await update(ref(db, path), data);
    return { success: true, message: message || "데이터가 성공적으로 업데이트되었습니다." };
  } catch (error: any) {
    console.error(`Error updating data at ${path}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * 회사의 정보를 구독하는 함수
 * @param path - 구독할 db 경로
 * @param callback - 구독할 함수 등록
 * @returns 데이터 누수 방지 cleanup 함수
 */
export function subscribeToData<T>(path: string, callback: (data: T | null) => void) {
  const dataRef = ref(db, path);

  const unsubscribe = onValue(dataRef, snapshot => {
    callback(snapshot.exists() ? (snapshot.val() as T) : null);
  });

  return () => off(dataRef, "value", unsubscribe);
}

/**
 * 현재 로그인한 사용자의 정보를 가져오는 함수
 * @param currentUser - Firebase 인증된 현재 사용자 객체
 * @returns 사용자 데이터 또는 null
 */
export async function getUser(currentUser: any) {
  // firebase 유저타입, 일회성 함수,타입이라 그냥 any 로 정의함
  if (!currentUser) return null;
  const path = `companyCode/${currentUser.photoURL}/users/${currentUser.uid}`;
  return await getData(path);
}
// 복잡한 비즈니스 로직이 포함된 특수 함수
export async function updateEmployeeSettings(companyCode, uid, settings) {
  try {
    const path = `companyCode/${companyCode}/users/${uid}`;
    const userRef = ref(db, path);

    await update(userRef, {
      jobName: settings.jobName,
      employmentType: settings.employmentType,
      salaryAmount: parseInt(settings.salary),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating employee settings:", error);
    return { success: false, error };
  }
}
/**
 * 특정 회사의 정보를 가져오는 함수
 * @param companyCode - 조회할 회사의 고유 코드
 * @returns 회사 정보 데이터 또는 null
 */
export async function getCompanyInfo(companyCode?: string) {
  if (!companyCode) return null;
  return await getData(getCompanyInfoPath(companyCode));
}

//
//
//
//
//
// 🔥 이전 버전에서 사용하던 함수들. 필요없을시 삭제

// 🔥 이동한 함수 -> 테스트 통과지 제거
// export async function fetchCurrentDayWork(companyCode, userId) {
//   try {
//     const date_path = `companyCode/${companyCode}/users/${userId}/date`;
//     const nightStart_path = `companyCode/${companyCode}/companyInfo/nightStart`;
//     const nightEnd_path = `companyCode/${companyCode}/companyInfo/nightEnd`;
//     const holidayList_path = `companyCode/${companyCode}/companyInfo/holidayList`;
//     const holidayPay_path = `companyCode/${companyCode}/companyInfo/holidayPay`;
//     const isNightPay_path = `companyCode/${companyCode}/companyInfo/isNightPay`;

//     const dateData = await getData(date_path);
//     const nightStartData = await getData(nightStart_path);
//     const nightEndData = await getData(nightEnd_path);
//     const holidayListData = await getData(holidayList_path);
//     const holidayPayData = await getData(holidayPay_path);
//     const isNightPayData = await getData(isNightPay_path);

//     return {
//       success: true,
//       data: {
//         dates: dateData || {},
//         nightStart: nightStartData,
//         nightEnd: nightEndData,
//         holidayList: holidayListData || {},
//         holidayPay: holidayPayData,
//         isNightPay: isNightPayData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching current day work:", error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// signupPage
// export async function validateCompanyCode(code) {
//   try {
//     const companyCodeData = await getData(`companyCode/${code}`);

//     if (companyCodeData && companyCodeData.companyInfo && companyCodeData.companyInfo.companyName) {
//       return {
//         isValid: true,
//         companyName: companyCodeData.companyInfo.companyName,
//       };
//     }

//     return {
//       isValid: false,
//       error: "일치하는 회사가 없습니다.",
//     };
//   } catch (error) {
//     return {
//       isValid: false,
//       error: error.message,
//     };
//   }
// }

// export async function setEmployeeUser({
//   name,
//   userId,
//   email,
//   phoneNumber,
//   companyCode,
//   selectJob,
//   employmentType,
// }) {
//   const userRef = ref(db, `companyCode/${companyCode}/users/${userId}`);
//   const userData = {
//     name: name,
//     uid: userId,
//     email: email,
//     phoneNumber: phoneNumber,
//     companyCode: companyCode,
//     jobName: selectJob,
//     employmentType: employmentType,
//     userType: "employee",
//   };
//   try {
//     await set(userRef, userData);
//     return {
//       success: true,
//     };
//   } catch (e) {
//     return {
//       success: false,
//       error: e.message,
//     };
//   }
// }

// export async function setCompanyAndManagerData({
//   formData,
//   userId,
//   companyCode,
//   name,
//   email,
//   phoneNumber,
// }) {
//   const companyRef = ref(db, `companyCode/${companyCode}/companyInfo`);
//   const userRef = ref(db, `companyCode/${companyCode}/users/${userId}`);

//   const companyData: TCompanyInfo = {
//     companyName: formData.companyBasic.companyName,
//     adminName: formData.companyBasic.adminName,
//     companyLogo: formData.companyBasic.companyLogo || "",
//     companyIntro: formData.companyBasic.companyIntro,
//     isDayNight: formData.companyNightHoliday.isDayNight,
//     nightStart: Number(formData.companyNightHoliday.nightStart) || 0,
//     nightEnd: Number(formData.companyNightHoliday.nightEnd) || 0,
//     payCheckDay: Number(formData.companyNightHoliday.payCheckDay) || 1,
//     isNightPay: formData.companyNightHoliday.nightPay!,
//     isHoliday: formData.companyNightHoliday.isHoliday,
//     holidayPay: formData.companyNightHoliday.holidayPay!,
//     holidayList: formData.companyNightHoliday.holidayList || [],
//     jobList: formData.companyJobList.companyJobs || [],
//     companyCode: companyCode,
//     qrValue: encrypt(companyCode),
//     workPlacesList: formData.companyWorkPlacesList.companyWorkPlaces,
//   };

//   const userData: TCMUserData = {
//     name: name!,
//     uid: userId,
//     email: email!,
//     phoneNumber: phoneNumber || "",
//     userType: "manager",
//     companyCode,
//   };
//   try {
//     await set(companyRef, companyData);
//     await set(userRef, userData);
//     return {
//       success: true,
//     };
//   } catch (e: any) {
//     return {
//       success: false,
//       error: e.message,
//     };
//   }
// }

// 직원 관리 페이지
// 직원 목록

// export const updateCompanyBasicInfo = async (companyCode: string, data: Partial<TCompanyInfo>) => {
//   try {
//     if (!companyCode) {
//       throw new Error("회사 코드가 없습니다.");
//     }
//     const companyRef = ref(db, `companyCode/${companyCode}/companyInfo`);

//     await update(companyRef, {
//       companyName: data.companyName,
//       adminName: data.adminName,
//       companyIntro: data.companyIntro,
//       companyLogo: data.companyLogo,
//     });

//     return { success: true, message: "회사 정보 변경이 완료되었습니다" };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// };

// export const updateCompanyJobList = async (companyCode: string, jobList: any) => {
//   try {
//     if (!companyCode) {
//       throw new Error("회사 코드가 없습니다.");
//     }

//     const jobListRef = ref(db, `companyCode/${companyCode}/companyInfo`);

//     await update(jobListRef, {
//       jobList: jobList,
//     });

//     return { success: true, message: "직무 목록이 성공적으로 업데이트되었습니다." };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// };

// export const updateCompanyNightHolidayInfo = async (
//   companyCode: string,
//   nightHolidayData: Partial<TCompanyInfo>,
// ) => {
//   try {
//     if (!companyCode) {
//       throw new Error("회사 코드가 없습니다.");
//     }

//     const nightHolidayRef = ref(db, `companyCode/${companyCode}/companyInfo`);

//     const formattedData: Partial<TCompanyInfo> = {
//       ...nightHolidayData,
//       nightEnd: Number(nightHolidayData.nightEnd),
//       nightStart: Number(nightHolidayData.nightStart),
//       payCheckDay: Number(nightHolidayData.payCheckDay),
//     };

//     await update(nightHolidayRef, formattedData);

//     return { success: true, message: "야간 및 공휴일 설정이 성공적으로 업데이트되었습니다." };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// };

// export const updateCompanyWorkPlacesList = async (
//   companyCode: string,
//   workPlacesList: TworkPlacesList,
// ) => {
//   try {
//     if (!companyCode) {
//       throw new Error("회사 코드가 없습니다.");
//     }

//     const workPlacesListRef = ref(db, `companyCode/${companyCode}/companyInfo`);

//     await update(workPlacesListRef, {
//       workPlacesList: workPlacesList,
//     });

//     return { success: true, message: "근무지 목록이 성공적으로 업데이트되었습니다." };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// };
