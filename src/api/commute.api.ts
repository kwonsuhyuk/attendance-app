import { getUserDayCommutePath } from "@/constants/api.path";
import { getData, setData, updateData } from ".";
import {
  TStartCommutePayload,
  TEndCommutePayload,
  TCommuteData,
  TCommuteStatus,
} from "@/model/types/commute.type";

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
  // 이제 checkTime은 한국시간 기준의 문자열로 전달합니다.
  checkTime: string,
  workplaceId: string,
  userLocation: { lat: number; lng: number },
) {
  try {
    // 입력된 시간을 Date 객체로 생성
    const date = new Date(checkTime);
    // Asia/Seoul 타임존 기준의 ISO-like 문자열 생성
    const checkTimeKST = formatToKST(date);
    // KST 기준 날짜 파츠 추출 (년, 월, 일)
    const { year, month, day } = getKSTDateParts(date);

    // 어제 날짜를 계산하여 KST 기준 파츠 추출
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

    // 상태에 따라 출근/퇴근 분기 처리
    switch (status) {
      case "not-checked-in":
        await setData(todayPath, startPayload, "출근 인증이 완료되었습니다.");
        return { success: true, message: "출근 인증이 완료되었습니다." };

      case "checked-in-only":
        await updateData(todayPath, endPayload, "퇴근 인증이 완료되었습니다.");
        return { success: true, message: "퇴근 인증이 완료되었습니다." };

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

// 외근 관련 기록 처리 (추후 기획에 따라 개선 필요)
export async function registerOutWork(
  companyCode: string,
  userId: string,
  isCheckout: boolean = false,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const now = new Date();
    // 현재 시간을 Asia/Seoul 타임존 기준 문자열로 변환
    const kstISOString = formatToKST(now);
    const { year, month, day } = getKSTDateParts(now);

    const path = getUserDayCommutePath(companyCode, year, month, day, userId);
    const existingData = await getData<TCommuteData>(path);

    const commonLocation = {
      checkLocation: { lat: 0, lng: 0 }, // 필요 시 실제 위치 값을 삽입하세요.
    };

    if (isCheckout) {
      if (existingData?.endTime) {
        return {
          success: false,
          error: "이미 퇴근 기록이 존재합니다.",
        };
      }

      const endPayload: Partial<TEndCommutePayload> = {
        endTime: kstISOString,
        endWorkplaceId: "외근",
        ...commonLocation,
      };

      return await updateData(path, endPayload, "외근 퇴근이 등록되었습니다.");
    } else {
      if (existingData?.startTime) {
        return {
          success: false,
          error: "이미 출근 기록이 존재합니다.",
        };
      }

      const startPayload: Partial<TStartCommutePayload> = {
        startTime: kstISOString,
        startWorkplaceId: "외근",
        ...commonLocation,
      };

      return await updateData(path, startPayload, "외근 출근이 등록되었습니다.");
    }
  } catch (error: any) {
    console.error("❌ Error registering out work:", error);
    return {
      success: false,
      error: "정상적으로 기록되지 않았습니다.",
    };
  }
}
