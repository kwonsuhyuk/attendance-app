import {
  getDayCommutePath,
  getOutworkRequestListPath,
  getUserDayCommutePath,
} from "@/constants/api.path";
import { getData, removeData, setData, updateData } from ".";
import {
  TStartCommutePayload,
  TEndCommutePayload,
  TCommuteData,
  TCommuteStatus,
  TStartOutWorkingPayload,
  TCalendarDayInfo,
  TCommuteRecord,
  TOutworkRequestWithId,
  TOutworkRequest,
} from "@/model/types/commute.type";
import { TWorkPlace } from "@/model/types/company.type";
import { fetchRegisteredVacationsByMonth } from "./vacation.api";
import dayjs from "dayjs";
import {
  get,
  getDatabase,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  push,
  ref,
} from "firebase/database";
import { TEmpUserData } from "@/model/types/user.type";

// KST 기준 ISO-like 문자열(타임존 표시 없이 "YYYY-MM-DDTHH:mm:ss" 형식)을 반환하는 헬퍼 함수
function formatToKST(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .format(date)
    .replace(" ", "T");
}

// KST 기준 날짜의 연도, 월, 일을 문자열로 추출하는 헬퍼 함수
function getKSTDateParts(date: Date): { year: string; month: string; day: string } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const partObj: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      partObj[part.type] = part.value;
    }
  }
  return { year: partObj.year, month: partObj.month, day: partObj.day };
}

export async function processCommute(
  status: TCommuteStatus,
  companyCode: string,
  userId: string,
  checkTime: string,
  workplaceId: string,
) {
  try {
    const date = new Date(checkTime);
    const checkTimeKST = formatToKST(date);
    const { year, month, day } = getKSTDateParts(date);

    const yesterdayDate = new Date(date);
    yesterdayDate.setDate(date.getDate() - 1);
    const { year: yYear, month: yMonth, day: yDay } = getKSTDateParts(yesterdayDate);

    const todayPath = getUserDayCommutePath(companyCode, year, month, day, userId);
    const yesterdayPath = getUserDayCommutePath(companyCode, yYear, yMonth, yDay, userId);

    const todayData = await getData<TCommuteData>(todayPath);
    const yesterdayData = await getData<TCommuteData>(yesterdayPath);

    const startPayload: TStartCommutePayload = {
      startTime: checkTimeKST,
      startWorkplaceId: workplaceId,
    };

    const endPayload: TEndCommutePayload = {
      endTime: checkTimeKST,
      endWorkplaceId: workplaceId,
    };

    switch (status) {
      case "not-checked-in":
        await setData(todayPath, startPayload, "출근 인증이 완료되었습니다.");
        return { success: true, message: "출근 인증이 완료되었습니다." };

      case "checked-in-only": {
        // ✅ 오늘 출근 기록이 없는 경우 → 어제 출근, 오늘 퇴근 → 어제 데이터에 퇴근 처리
        const hasTodayStart = !!todayData?.startTime;
        if (!hasTodayStart && yesterdayData?.startTime && !yesterdayData?.endTime) {
          await updateData(yesterdayPath, endPayload, "어제 출근 → 오늘 퇴근 처리 완료되었습니다.");
          return { success: true, message: "퇴근 인증이 완료되었습니다." };
        }

        // ✅ 오늘 출근했고, 오늘 퇴근하는 경우
        if (todayData?.startTime && !todayData?.endTime) {
          await updateData(todayPath, endPayload, "퇴근 인증이 완료되었습니다.");
          return { success: true, message: "퇴근 인증이 완료되었습니다." };
        }

        return { success: false, error: "적절한 출근 기록이 없습니다." };
      }

      case "missing-check-in":
        if (!yesterdayData?.startTime) {
          return { success: false, error: "어제 출근 기록이 없습니다." };
        }
        await setData(todayPath, startPayload, "출근 인증이 완료되었습니다.");
        await updateData(
          yesterdayPath,
          { ...endPayload, endTime: todayData?.endTime },
          "어제 퇴근 기록이 업데이트되었습니다.",
        );
        return { success: true, message: "출근 인증이 완료되었습니다." };

      case "checked-in-and-out":
        return { success: false, error: "금일 출근, 퇴근을 이미 완료했습니다." };

      default:
        return { success: false, error: "알 수 없는 상태입니다." };
    }
  } catch (error: any) {
    console.error("❌ Error processing commute:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 외근 요청 등록 함수 (Firebase push로 자동 ID 생성)
 * @param companyCode 회사 코드
 * @param data 외근 요청 데이터
 * @returns 등록 성공 여부와 자동 생성된 ID
 */
export async function createOutworkRequest(
  companyCode: string,
  data: TOutworkRequest,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const path = getOutworkRequestListPath(companyCode);
    const requestRef = ref(getDatabase(), path);
    const newRef = await push(requestRef, data);
    return { success: true, id: newRef.key || undefined };
  } catch (error: any) {
    console.error("외근 요청 등록 실패:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 외근 요청 리스트를 실시간으로 구독하는 함수
 */
export function subscribeToOutworkRequests(
  companyCode: string,
  callback: (data: TOutworkRequestWithId[]) => void,
) {
  const path = getOutworkRequestListPath(companyCode);
  const requestRef = ref(getDatabase(), path);

  const unsubscribe = onValue(requestRef, snapshot => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const raw = snapshot.val();
    const requestList: TOutworkRequestWithId[] = Object.entries(raw).map(([id, value]) => ({
      ...(value as TOutworkRequest),
      id,
    }));

    callback(requestList);
  });

  return () => off(requestRef, "value", unsubscribe);
}

/**
 * 외근 요청 삭제 함수 (removeData 유틸 사용)
 * @param companyCode 회사 코드
 * @param requestId 삭제할 요청 ID
 */
export async function deleteOutworkRequest(companyCode: string, requestId: string) {
  const path = `${getOutworkRequestListPath(companyCode)}/${requestId}`;
  return await removeData(path, "외근 요청이 삭제되었습니다.");
}

export async function registerOutWork(
  companyCode: string,
  userId: string,
  memo: string,
  isCheckout: boolean,
  scanTime: string,
  status: TCommuteStatus,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const now = new Date();
    const { year, month, day } = getKSTDateParts(now);
    const todayPath = getUserDayCommutePath(companyCode, year, month, day, userId);
    const todayData = await getData<TCommuteData>(todayPath);
    if (!status) return { success: false, error: "직원 출근 상태가 유효하지 않습니다." };
    if (!scanTime) return { success: false, error: "요청 시간이 유효하지 않습니다." };
    const kstTime = formatToKST(new Date(scanTime));
    if (isCheckout) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const { year: yYear, month: yMonth, day: yDay } = getKSTDateParts(yesterday);
      const yesterdayPath = getUserDayCommutePath(companyCode, yYear, yMonth, yDay, userId);
      const yesterdayData = await getData<TCommuteData>(yesterdayPath);

      switch (status) {
        case "checked-in-only": {
          // 어제 출근하고 오늘 퇴근이면 어제 기록에 업데이트
          if (yesterdayData?.startTime && !yesterdayData?.endTime && !todayData?.startTime) {
            return await updateData(
              yesterdayPath,
              {
                endWorkplaceId: "외근",
                endTime: kstTime,
                outworkingMemo: memo,
              },
              "외근 퇴근이 등록되었습니다.",
            );
          }

          // 오늘 출근 후 퇴근 처리
          if (todayData?.startTime && !todayData?.endTime) {
            return await updateData(
              todayPath,
              {
                endWorkplaceId: "외근",
                endTime: kstTime,
                outworkingMemo: memo,
              },
              "외근 퇴근이 등록되었습니다.",
            );
          }

          return {
            success: false,
            error: "퇴근 기록을 등록할 수 없습니다. 출근 상태를 확인해주세요.",
          };
        }

        case "not-checked-in":
          return { success: false, error: "출근 기록이 없습니다. 퇴근을 등록할 수 없습니다." };

        case "checked-in-and-out":
          return { success: false, error: "이미 출퇴근을 완료하셨습니다." };

        case "missing-check-in":
          return { success: false, error: "출근 정보가 누락되었습니다." };

        case "out-working":
          return { success: false, error: "이미 외근 처리가 완료된 상태입니다." };

        default:
          return { success: false, error: "알 수 없는 상태입니다." };
      }
    } else {
      // 출근 처리
      if (todayData?.startTime) {
        return {
          success: false,
          error: "이미 출근 기록이 존재합니다.",
        };
      }

      const payload: TStartOutWorkingPayload = {
        startWorkplaceId: "외근",
        startTime: kstTime,
        outworkingMemo: memo,
      };

      return await setData(todayPath, payload, "외근 출근이 등록되었습니다.");
    }
  } catch (error: any) {
    return {
      success: false,
      error: "정상적으로 기록되지 않았습니다.",
    };
  }
}

// 기간별 조회 함수
export async function fetchCommutesByPeriod(
  companyCode: string,
  userId: string,
  year: string,
  month: string,
): Promise<Record<string, TCommuteData> | null> {
  const basePath = `attendance/${companyCode}/${year}/${month}`;
  try {
    const snapshot = await getData<Record<string, Record<string, TCommuteData>>>(basePath);
    if (!snapshot) return null;

    const result: Record<string, TCommuteData> = {};

    Object.entries(snapshot).forEach(([day, users]) => {
      const userCommute = users[userId];

      if (
        userCommute?.startTime ||
        userCommute?.endTime ||
        userCommute?.startWorkplaceId === "외근" ||
        userCommute?.endWorkplaceId === "외근"
      ) {
        result[day] = userCommute;
      }
    });

    return result;
  } catch (error) {
    console.error("❌ 출퇴근 조회 실패:", error);
    return null;
  }
}

export async function fetchCalendarSummaryByWorkplace(
  companyCode: string,
  year: string,
  month: string,
  workplaceFilter: string,
  workPlaceList: TWorkPlace[],
  holidayList: string[] = [],
): Promise<(TCalendarDayInfo | null)[]> {
  const monthPath = `attendance/${companyCode}/${year}/${month}`;

  try {
    const [monthData, vacationData] = await Promise.all([
      getData<Record<string, Record<string, TCommuteData>>>(monthPath),
      fetchRegisteredVacationsByMonth(companyCode, year, month),
    ]);

    // 날짜별 휴가 카운트 집계
    const vacationCountMap = new Map<string, number>();
    Object.values(vacationData ?? {}).forEach(userVacations => {
      Object.values(userVacations).forEach(vac => {
        const start = dayjs(vac.startDate);
        const end = dayjs(vac.endDate);
        for (let d = start; d.isSameOrBefore(end); d = d.add(1, "day")) {
          const dayKey = d.format("DD");
          vacationCountMap.set(dayKey, (vacationCountMap.get(dayKey) ?? 0) + 1);
        }
      });
    });

    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
    const startDay = new Date(Number(year), Number(month) - 1, 1).getDay(); // 0: 일 ~ 6: 토

    const result: (TCalendarDayInfo | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      result.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayKey = String(i).padStart(2, "0");
      const dayData = monthData?.[dayKey];

      const isCompanyHoliday = holidayList.includes(`${year}-${month}-${dayKey}`);

      const dayInfo: TCalendarDayInfo = {
        day: i,
        summary: {
          출근: 0,
          외근: 0,
          휴가: vacationCountMap.get(dayKey) ?? 0, // 날짜별 휴가 수 포함
          총원: 0,
        },
        isCompanyHoliday,
      };

      if (dayData) {
        Object.values(dayData).forEach(data => {
          const workplaceId = data.startWorkplaceId || data.endWorkplaceId;
          const workplaceName =
            workplaceId === "외근" ? "외근" : workPlaceList?.find(p => p.id === workplaceId)?.name;

          // 외근은 필터 상관없이 항상 포함
          if (workplaceName === "외근" || data.outworkingMemo) {
            dayInfo.summary.외근 += 1;
            dayInfo.summary.총원 += 1;
            return;
          }

          // 출근은 필터 기준에 따라 포함 여부 결정
          if (data.startTime) {
            if (workplaceFilter === "전체" || workplaceName === workplaceFilter) {
              dayInfo.summary.출근 += 1;
              dayInfo.summary.총원 += 1;
            }
          }
        });
      }

      result.push(dayInfo);
    }

    while (result.length % 7 !== 0) {
      result.push(null);
    }

    return result;
  } catch (err) {
    console.error("❌ fetchCalendarSummaryByWorkplace error:", err);

    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
    const startDay = new Date(Number(year), Number(month) - 1, 1).getDay();

    const result: (TCalendarDayInfo | null)[] = [];

    for (let i = 0; i < startDay; i++) result.push(null);

    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        day: i,
        summary: {
          출근: 0,
          외근: 0,
          휴가: 0,
          총원: 0,
        },
      });
    }

    while (result.length % 7 !== 0) result.push(null);

    return result;
  }
}

/**
 * 출퇴근 + 유저 정보 실시간 구독
 */
export async function subscribeToTodayCommuteDataWithUserInfo(
  companyCode: string,
  year: string,
  month: string,
  day: string,
  onUpdate: (data: TCommuteRecord[]) => void,
): Promise<() => void> {
  try {
    const usersPath = `companyCode/${companyCode}/users`;
    const userMap = await getData<Record<string, TEmpUserData>>(usersPath);

    if (!userMap) {
      console.warn("유저 정보가 없습니다.");
      onUpdate([]);
      return () => {};
    }

    const commutePath = getDayCommutePath(companyCode, year, month, day);
    const commuteRef = ref(getDatabase(), commutePath);

    const unsubscribe = onValue(commuteRef, snapshot => {
      const raw = snapshot.val();
      if (!raw) {
        onUpdate([]);
        return;
      }

      const result: TCommuteRecord[] = Object.entries(raw).map(([userId, record]: any) => ({
        userId,
        startTime: record.startTime,
        startWorkplaceId: record.startWorkplaceId,
        endTime: record.endTime,
        endWorkplaceId: record.endWorkplaceId,
        outworkingMemo: record.outworkingMemo,
        userInfo: userMap[userId] ?? undefined,
      }));

      onUpdate(result);
    });

    return unsubscribe;
  } catch (error) {
    console.error("❌ 유저 or 출퇴근 데이터 구독 실패:", error);
    onUpdate([]);
    return () => {};
  }
}
