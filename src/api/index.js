import { get, getDatabase, ref, onValue, off, update } from 'firebase/database';

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
