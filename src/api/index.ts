import { get, set, getDatabase, ref, update } from "firebase/database";
import "@/firebase";
import { getCompanyInfoPath } from "@/constants/api.path";
import { TCompanyInfo } from "@/model/types/company.type";

const db = getDatabase();

// 공통 데이터 조회 함수
export async function getData(path: string) {
  try {
    const snapshot = await get(ref(db, path));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error: any) {
    console.error(`Error fetching data from ${path}:`, error);
    return null;
  }
}

/**
 * Firebase 데이터 저장 함수
 * @param path 저장할 Firebase 경로
 * @param data 저장할 데이터
 * @param message 성공 시 반환할 메시지 (선택 사항)
 * @returns 성공 또는 실패 응답 객체
 */
export async function setData(path: string, data: any, message?: string) {
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
 * @param data 업데이트할 데이터
 * @param message 성공 시 반환할 메시지 (선택 사항)
 * @returns 성공 또는 실패 응답 객체
 */
export async function updateData(path: string, data: any, message?: string) {
  try {
    await update(ref(db, path), data);
    return { success: true, message: message || "데이터가 성공적으로 업데이트되었습니다." };
  } catch (error: any) {
    console.error(`Error updating data at ${path}:`, error);
    return { success: false, error: error.message };
  }
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

/**
 * 특정 회사의 정보를 가져오는 함수
 * @param companyCode - 조회할 회사의 고유 코드
 * @returns 회사 정보 데이터 또는 null
 */
export async function getCompanyInfo(companyCode: string) {
  if (!companyCode) return null;
  return await getData(getCompanyInfoPath(companyCode));
}
//
//
//
//
//
// 🔥 이전 버전에서 사용하던 함수들. 필요없을시 삭제

function getNextDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}
function getPrevDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}
//

export async function fetchWorkTimes(companyCode, userId) {
  try {
    const path = `companyCode/${companyCode}/users/${userId}/date`;
    const dateRef = await getData(path);

    if (!dateRef) {
      return { success: true, workTimes: {}, datesList: null };
    }

    const dates = dateRef;
    let newWorkTimes = {};

    for (let date in dates) {
      const { startTime, endTime } = dates[date];
      let start, end, workDate;

      if (startTime === "외근") {
        newWorkTimes[date] = "외근";
        continue;
      }

      // Handle start time
      if (startTime) {
        start = new Date(startTime);
        workDate = start.toLocaleDateString("fr-CA");
      } else {
        const path = `companyCode/${companyCode}/users/${userId}/date/${prevDay}`;
        const prevDay = getPrevDate(date);
        const prevDayRef = await getData(path);
        if (prevDayRef && prevDayRef.startTime) {
          start = new Date(prevDayRef.startTime);
        } else {
          throw new Error(`${date}의 시작 시간이 없습니다.`);
        }
      }

      // Handle end time
      if (endTime) {
        end = new Date(endTime);
      } else {
        const path = `companyCode/${companyCode}/users/${userId}/date/${nextDay}`;
        const nextDay = getNextDate(date);
        const nextDayRef = await getData(path);

        if (nextDayRef && nextDayRef.endTime) {
          end = new Date(nextDayRef.endTime);
        } else {
          throw new Error(`${date}의 퇴근 시간이 없습니다. 아직 퇴근을 하지 않았을 수 있습니다.`);
        }
      }

      if (start && end) {
        let workHours;
        if (start < end) {
          workHours = Number((Math.abs(end - start) / 36e5).toFixed(1));
          if (workHours >= 9) {
            workHours -= 1; // 점심시간 제외
          }
        } else {
          workHours = Number((24 - start.getHours() + end.getHours()).toFixed(1));
          if (workHours >= 9) {
            workHours -= 1; // 점심시간 제외
          }
        }

        const workDateRef = ref(
          db,
          `companyCode/${companyCode}/users/${userId}/workDates/${workDate}`,
        );
        const workDateSnapshot = await getData(workDateRef);
        if (workDateSnapshot) {
          await update(workDateRef, { workHour: workHours });
        }

        newWorkTimes[workDate] = workHours;
      }
    }

    return {
      success: true,
      workTimes: newWorkTimes,
      datesList: dates,
    };
  } catch (error) {
    console.error("Error fetching work times:", error);
    return {
      success: false,
      error: error.message,
      workTimes: {},
      datesList: null,
    };
  }
}

export async function registerOutWork(companyCode, userId) {
  try {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - offset);
    const nowStr = now.toISOString().slice(0, 10);

    await set(ref(db, `companyCode/${companyCode}/users/${userId}/date/${nowStr}`), {
      startTime: "외근",
      endTime: "외근",
    });
    await set(ref(db, `companyCode/${companyCode}/users/${userId}/workDates/${nowStr}`), {
      workHour: "외근",
    });

    return { success: true, message: "외근 등록이 완료되었습니다." };
  } catch (error) {
    console.error("Error registering out work:", error);
    return {
      success: false,
      error: "정상적으로 기록되지 않았습니다.",
    };
  }
}

// 급여일 정보와 급여 데이터 조회
export async function fetchSalaryInfo(companyCode, userId) {
  try {
    const workDate_path = `companyCode/${companyCode}/users/${userId}/workDates`;
    const salaryDay_path = `companyCode/${companyCode}/companyInfo/payCheckDay`;
    const workDateData = await getData(workDate_path);
    const salaryDayData = await getData(salaryDay_path);

    const salaryDay = salaryDayData ? salaryDayData : 0;
    const workDates = workDateData ? workDateData : {};

    let totalDayHour1 = 0,
      totalNightHour1 = 0,
      totalHolidayHour1 = 0;
    let totalDayHour2 = 0,
      totalNightHour2 = 0,
      totalHolidayHour2 = 0;
    let totalDayPay1 = 0,
      totalNightPay1 = 0,
      totalHolidayPay1 = 0;
    let totalDayPay2 = 0,
      totalNightPay2 = 0,
      totalHolidayPay2 = 0;
    let totalWorkHour1 = 0,
      totalWorkHour2 = 0;
    let totalSalaryPay1 = 0,
      totalSalaryPay2 = 0;

    const today = new Date();

    for (const date in workDates) {
      const dateObj = new Date(date);
      const workData = workDates[date];

      if (workData.workHour === "외근") continue;

      const { workHour, daySalary, nightSalary, holidayAndWeekendSalary } = workData;

      // 급여일 이후 데이터
      if (dateObj.getMonth() === today.getMonth() && dateObj.getDate() >= salaryDay) {
        if (daySalary > 0) {
          totalDayHour1 += workHour;
          totalDayPay1 += daySalary;
        }
        if (nightSalary > 0) {
          totalNightHour1 += workHour;
          totalNightPay1 += nightSalary;
        }
        if (holidayAndWeekendSalary > 0) {
          totalHolidayHour1 += workHour;
          totalHolidayPay1 += holidayAndWeekendSalary;
        }
        totalWorkHour1 += workHour;
        totalSalaryPay1 += daySalary + nightSalary + holidayAndWeekendSalary;
      }
      // 이전 급여일부터 현재 급여일까지의 데이터
      else if (
        (dateObj.getMonth() === today.getMonth() && dateObj.getDate() < salaryDay) ||
        (dateObj.getMonth() === today.getMonth() - 1 && dateObj.getDate() >= salaryDay)
      ) {
        if (daySalary > 0) {
          totalDayHour2 += workHour;
          totalDayPay2 += daySalary;
        }
        if (nightSalary > 0) {
          totalNightHour2 += workHour;
          totalNightPay2 += nightSalary;
        }
        if (holidayAndWeekendSalary > 0) {
          totalHolidayHour2 += workHour;
          totalHolidayPay2 += holidayAndWeekendSalary;
        }
        totalWorkHour2 += workHour;
        totalSalaryPay2 += daySalary + nightSalary + holidayAndWeekendSalary;
      }
    }

    return {
      success: true,
      data: {
        salaryDay,
        currentPeriod: {
          dayHours: totalDayHour1,
          nightHours: totalNightHour1,
          holidayHours: totalHolidayHour1,
          dayPay: totalDayPay1,
          nightPay: totalNightPay1,
          holidayPay: totalHolidayPay1,
          totalWorkHours: totalWorkHour1,
          totalPay: totalSalaryPay1,
        },
        previousPeriod: {
          dayHours: totalDayHour2,
          nightHours: totalNightHour2,
          holidayHours: totalHolidayHour2,
          dayPay: totalDayPay2,
          nightPay: totalNightPay2,
          holidayPay: totalHolidayPay2,
          totalWorkHours: totalWorkHour2,
          totalPay: totalSalaryPay2,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching salary info:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

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
