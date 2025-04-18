import { getUserDayCommutePath } from "@/constants/api.path";
import { getData, setData, updateData } from ".";
import {
  TStartCommutePayload,
  TEndCommutePayload,
  TCommuteData,
  TCommuteStatus,
  TStartOutWorkingPayload,
  TEndOutwokingPayload,
  TCalendarDayInfo,
} from "@/model/types/commute.type";
import { TWorkPlace } from "@/model/types/company.type";

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

export async function registerOutWork(
  companyCode: string,
  userId: string,
  memo: string,
  isCheckout: boolean,
  status?: TCommuteStatus,
  scanTime?: string,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const now = new Date();
    const { year, month, day } = getKSTDateParts(now);
    const todayPath = getUserDayCommutePath(companyCode, year, month, day, userId);
    const todayData = await getData<TCommuteData>(todayPath);

    if (isCheckout) {
      if (!status) return { success: false, error: "출퇴근 상태 정보가 없습니다." };
      if (!scanTime) return { success: false, error: "스캔 시간이 유효하지 않습니다." };

      const kstTime = formatToKST(new Date(scanTime));

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
      if (users[userId]) {
        result[day] = users[userId];
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
    const monthData = await getData<Record<string, Record<string, TCommuteData>>>(monthPath);

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
          휴가: 0,
          총원: 0,
        },
        isCompanyHoliday,
      };

      if (dayData) {
        Object.values(dayData).forEach(data => {
          const workplaceId = data.startWorkplaceId || data.endWorkplaceId;
          const workplaceName =
            workplaceId === "외근" ? "외근" : workPlaceList.find(p => p.id === workplaceId)?.name;

          if (workplaceFilter !== "전체" && workplaceName !== workplaceFilter) return;

          dayInfo.summary.총원 += 1;

          if (workplaceName === "외근" || data.outworkingMemo) {
            dayInfo.summary.외근 += 1;
          } else if (data.startTime) {
            dayInfo.summary.출근 += 1;
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
