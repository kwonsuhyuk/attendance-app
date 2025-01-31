import { get, set, getDatabase, ref, onValue, off, update } from 'firebase/database';

const db = getDatabase();

// 단순 데이터 조회용 유틸리티 함수
export async function fetchData(path) {
  try {
    const snapshot = await get(ref(db, path));
    return snapshot.val() || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getUser(currentUser) {
  if (!currentUser) return null;
  const path = `companyCode/${currentUser.photoURL}/users/${currentUser.uid}`;
  return await fetchData(path);
}

export async function getCompanyInfo(currentUser) {
  if (!currentUser) return null;
  const path = `companyCode/${currentUser.photoURL}/companyInfo`;
  return await fetchData(path);
}

// 실시간 데이터 구독용 함수
// jobName
export function subscribeToJobNames(companyCode, callback) {
  const jobRef = ref(db, `companyCode/${companyCode}/companyInfo/jobName`);

  // 데이터 구독 시작
  onValue(jobRef, snapshot => {
    const data = snapshot.val();
    callback(Object.values(data));
  });

  // 구독 해제 함수 반환
  return () => off(jobRef);
}

// 복잡한 비즈니스 로직이 포함된 특수 함수
export async function updateEmployeeSettings(companyCode, uid, settings) {
  try {
    const db = getDatabase();
    const userRef = ref(db, `companyCode/${companyCode}/users/${uid}`);

    await update(userRef, {
      jobName: settings.jobName,
      salaryType: settings.salaryType,
      salaryAmount: parseInt(settings.salary),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating employee settings:', error);
    return { success: false, error };
  }
}

function getNextDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

function getPrevDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

export async function fetchWorkTimes(companyCode, userId) {
  try {
    const db = getDatabase();
    const dateRef = ref(db, `companyCode/${companyCode}/users/${userId}/date`);
    const snapshot = await get(dateRef);

    if (!snapshot.exists()) {
      return { success: true, workTimes: {}, datesList: null };
    }

    const dates = snapshot.val();
    let newWorkTimes = {};

    for (let date in dates) {
      const { startTime, endTime } = dates[date];
      let start, end, workDate;

      if (startTime === '외근') {
        newWorkTimes[date] = '외근';
        continue;
      }

      // Handle start time
      if (startTime) {
        start = new Date(startTime);
        workDate = start.toLocaleDateString('fr-CA');
      } else {
        const prevDay = getPrevDate(date);
        const prevDayRef = ref(db, `companyCode/${companyCode}/users/${userId}/date/${prevDay}`);
        const prevDaySnapShot = await get(prevDayRef);
        if (prevDaySnapShot.exists() && prevDaySnapShot.val().startTime) {
          start = new Date(prevDaySnapShot.val().startTime);
        } else {
          throw new Error(`${date}의 시작 시간이 없습니다.`);
        }
      }

      // Handle end time
      if (endTime) {
        end = new Date(endTime);
      } else {
        const nextDay = getNextDate(date);
        const nextDayRef = ref(db, `companyCode/${companyCode}/users/${userId}/date/${nextDay}`);
        const nextDaySnapshot = await get(nextDayRef);

        if (nextDaySnapshot.exists() && nextDaySnapshot.val().endTime) {
          end = new Date(nextDaySnapshot.val().endTime);
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

        const workDateRef = ref(db, `companyCode/${companyCode}/users/${userId}/workDates/${workDate}`);
        const workDateSnapshot = await get(workDateRef);
        if (workDateSnapshot.exists() && workDateSnapshot.val()) {
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
    console.error('Error fetching work times:', error);
    return {
      success: false,
      error: error.message,
      workTimes: {},
      datesList: null,
    };
  }
}

export async function fetchHolidaySettings(companyCode) {
  try {
    const snapshot = await get(ref(getDatabase(), `companyCode/${companyCode}/companyInfo`));
    const data = snapshot?.val();

    return {
      success: true,
      data: {
        isHoliday: data?.isholiday,
        holidayPay: data?.holidayPay,
      },
    };
  } catch (error) {
    console.error('Error fetching holiday settings:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function fetchHolidayList(companyCode) {
  try {
    const dbref = ref(getDatabase(), `companyCode/${companyCode}/companyInfo/holidayList`);
    const snapshot = await get(dbref);

    if (snapshot.exists()) {
      const holidays = snapshot.val();
      const dates = Object.keys(holidays).map(dateStr => new Date(dateStr));
      return {
        success: true,
        dates: dates,
      };
    }

    return {
      success: true,
      dates: [],
    };
  } catch (error) {
    console.error('Error fetching holiday list:', error);
    return {
      success: false,
      error: error.message,
      dates: [],
    };
  }
}

export async function saveHolidaySettings(companyCode, { holidays, isHoliday, holidayPay }) {
  try {
    const holidayList = holidays.reduce((obj, date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      obj[dateStr] = true;
      return obj;
    }, {});

    const db = getDatabase();
    const updates = {
      [`companyCode/${companyCode}/companyInfo/holidayList`]: holidayList,
      [`companyCode/${companyCode}/companyInfo/isholiday`]: isHoliday,
      [`companyCode/${companyCode}/companyInfo/holidayPay`]: parseFloat(holidayPay),
    };

    await update(ref(db), updates);
    return { success: true };
  } catch (error) {
    console.error('Error saving holiday settings:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function fetchCompanyAndJobInfo(companyCode, userId) {
  try {
    const db = getDatabase();
    const companySnapshot = await get(ref(db, `companyCode/${companyCode}/companyInfo`));
    const jobSnapshot = await get(ref(db, `companyCode/${companyCode}/users/${userId}/jobName`));

    if (companySnapshot.exists() && jobSnapshot.exists()) {
      return {
        success: true,
        data: {
          companyInfo: companySnapshot.val(),
          jobName: jobSnapshot.val(),
        },
      };
    }
    return {
      success: false,
      error: '회사 정보를 찾을 수 없습니다.',
    };
  } catch (error) {
    console.error('Error fetching company info:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function processQRScan(companyCode, userId, scanTime) {
  try {
    const db = getDatabase();
    const date = new Date(scanTime);
    const offset = date.getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - offset);

    const nowStr = now.toISOString().slice(0, 10);
    const yesterdayForNow = new Date(Date.now() - offset);
    yesterdayForNow.setDate(yesterdayForNow.getDate() - 1);
    const yesterdayStr = yesterdayForNow.toISOString().slice(0, 10);

    // 현재 날짜와 이전 날짜의 데이터 참조
    const todayRef = ref(db, `companyCode/${companyCode}/users/${userId}/date/${nowStr}`);
    const todayWorkRef = ref(db, `companyCode/${companyCode}/users/${userId}/workDates/${nowStr}`);
    const yesterdayRef = ref(db, `companyCode/${companyCode}/users/${userId}/date/${yesterdayStr}`);
    const yesterdayWorkRef = ref(db, `companyCode/${companyCode}/users/${userId}/workDates/${yesterdayStr}`);

    const todaySnapshot = await get(todayRef);
    const yesterdaySnapshot = await get(yesterdayRef);

    // 다양한 출퇴근 상황 처리
    if (yesterdaySnapshot.exists() || todaySnapshot.exists()) {
      // 어제 출근, 퇴근 미처리
      if (
        !todaySnapshot.exists() &&
        yesterdaySnapshot.exists() &&
        yesterdaySnapshot.val().startTime &&
        !yesterdaySnapshot.val().endTime
      ) {
        await update(yesterdayRef, { endTime: scanTime });
        return { success: true, message: '다음 날 퇴근 인증이 완료되었습니다' };
      }

      // 오늘 출근, 퇴근 처리
      if (todaySnapshot.exists() && todaySnapshot.val().startTime && !todaySnapshot.val().endTime) {
        await update(todayRef, { endTime: scanTime });
        return { success: true, message: '퇴근 인증이 완료되었습니다' };
      }

      // 오늘 퇴근만 있고 출근 기록이 없는 경우
      if (todaySnapshot.exists() && todaySnapshot.val().endTime && !todaySnapshot.val().startTime) {
        const startTime = yesterdaySnapshot.val().startTime;
        const endTime = todaySnapshot.val().endTime;
        const start = new Date(startTime);
        const end = new Date(endTime);
        const workHours = Number((24 - start.getHours() + end.getHours()).toFixed(1));

        await set(todayRef, { startTime: scanTime });
        await update(yesterdayRef, { endTime: endTime });
        await update(yesterdayWorkRef, { workHour: workHours });
        await set(todayWorkRef, {
          workHour: 0,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });

        return { success: true, message: '출근 인증이 완료되었습니다' };
      }

      // 새로운 날 출근
      if (!todaySnapshot.exists() && yesterdaySnapshot.val().startTime && yesterdaySnapshot.val().endTime) {
        await set(todayRef, { startTime: scanTime });
        await set(todayWorkRef, {
          workHour: 0,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });

        return { success: true, message: '출근 인증이 완료되었습니다' };
      }
    } else {
      // 최초 출근
      await set(todayRef, { startTime: scanTime });
      await set(todayWorkRef, {
        workHour: 0,
        daySalary: 0,
        nightSalary: 0,
        holidayAndWeekendSalary: 0,
      });

      return { success: true, message: '출근 인증이 완료되었습니다' };
    }

    return { success: false, error: '처리할 수 없는 상태입니다.' };
  } catch (error) {
    console.error('Error processing QR scan:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function registerOutWork(companyCode, userId) {
  try {
    const db = getDatabase();
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - offset);
    const nowStr = now.toISOString().slice(0, 10);

    await set(ref(db, `companyCode/${companyCode}/users/${userId}/date/${nowStr}`), {
      startTime: '외근',
      endTime: '외근',
    });
    await set(ref(db, `companyCode/${companyCode}/users/${userId}/workDates/${nowStr}`), { workHour: '외근' });

    return { success: true, message: '외근 등록이 완료되었습니다.' };
  } catch (error) {
    console.error('Error registering out work:', error);
    return {
      success: false,
      error: '정상적으로 기록되지 않았습니다.',
    };
  }
}

// 급여일 정보와 급여 데이터 조회
export async function fetchSalaryInfo(companyCode, userId) {
  try {
    const db = getDatabase();
    const workDateRef = ref(db, `companyCode/${companyCode}/users/${userId}/workDates`);
    const salaryDayRef = ref(db, `companyCode/${companyCode}/companyInfo/payCheckDay`);

    const [workDateSnapshot, salaryDaySnapshot] = await Promise.all([get(workDateRef), get(salaryDayRef)]);

    const salaryDay = salaryDaySnapshot.exists() ? salaryDaySnapshot.val() : 0;
    const workDates = workDateSnapshot.exists() ? workDateSnapshot.val() : {};

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

      if (workData.workHour === '외근') continue;

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
        period1: {
          dayHours: totalDayHour1,
          nightHours: totalNightHour1,
          holidayHours: totalHolidayHour1,
          dayPay: totalDayPay1,
          nightPay: totalNightPay1,
          holidayPay: totalHolidayPay1,
          totalWorkHours: totalWorkHour1,
          totalPay: totalSalaryPay1,
        },
        period2: {
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
    console.error('Error fetching salary info:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function fetchCurrentDayWork(companyCode, userId) {
  try {
    const db = getDatabase();
    const dateRef = ref(db, `companyCode/${companyCode}/users/${userId}/date`);
    const nightStartRef = ref(db, `companyCode/${companyCode}/companyInfo/nightStart`);
    const nightEndRef = ref(db, `companyCode/${companyCode}/companyInfo/nightEnd`);
    const holidayListRef = ref(db, `companyCode/${companyCode}/companyInfo/holidayList`);
    const holidayPayRef = ref(db, `companyCode/${companyCode}/companyInfo/holidayPay`);
    const isNightPayRef = ref(db, `companyCode/${companyCode}/companyInfo/isNightPay`);

    const [
      dateSnapshot,
      nightStartSnapshot,
      nightEndSnapshot,
      holidayListSnapshot,
      holidayPaySnapshot,
      isNightPaySnapshot,
    ] = await Promise.all([
      get(dateRef),
      get(nightStartRef),
      get(nightEndRef),
      get(holidayListRef),
      get(holidayPayRef),
      get(isNightPayRef),
    ]);

    return {
      success: true,
      data: {
        dates: dateSnapshot.val() || {},
        nightStart: nightStartSnapshot.val(),
        nightEnd: nightEndSnapshot.val(),
        holidayList: holidayListSnapshot.val() || {},
        holidayPay: holidayPaySnapshot.val(),
        isNightPay: isNightPaySnapshot.val(),
      },
    };
  } catch (error) {
    console.error('Error fetching current day work:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
