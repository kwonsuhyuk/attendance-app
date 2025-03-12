import { getUserDatePath, getUserWorkDatePath } from "@/constants/api.path";
import { getData, setData, updateData } from ".";

/**
 * QR 출퇴근 인증 처리
 */
export async function processQRScan(companyCode: string, userId: string, scanTime: string) {
  try {
    const date = new Date(scanTime);
    const offset = date.getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - offset);

    const nowStr = now.toISOString().slice(0, 10);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    // 현재 날짜와 이전 날짜의 데이터 참조
    const todayPath = getUserDatePath(companyCode, userId, nowStr);
    const todayWorkPath = getUserWorkDatePath(companyCode, userId, nowStr);
    const yesterdayPath = getUserDatePath(companyCode, userId, yesterdayStr);
    const yesterdayWorkPath = getUserWorkDatePath(companyCode, userId, yesterdayStr);

    const todayData = await getData(todayPath);
    const yesterdayData = await getData(yesterdayPath);

    // 다양한 출퇴근 상황 처리
    if (yesterdayData || todayData) {
      // 어제 출근, 퇴근 미처리
      if (!todayData && yesterdayData?.startTime && !yesterdayData?.endTime) {
        return await updateData(
          yesterdayPath,
          { endTime: scanTime },
          "다음 날 퇴근 인증이 완료되었습니다.",
        );
      }

      // 오늘 출근, 퇴근 처리
      if (todayData?.startTime && !todayData?.endTime) {
        return await updateData(todayPath, { endTime: scanTime }, "퇴근 인증이 완료되었습니다.");
      }

      // 오늘 퇴근만 있고 출근 기록이 없는 경우
      if (todayData?.endTime && !todayData?.startTime) {
        const startTime = yesterdayData?.startTime;
        const endTime = todayData.endTime;
        if (!startTime) {
          return { success: false, error: "어제 출근 기록이 없습니다." };
        }
        const workHours = calculateWorkHours(startTime, endTime);

        await setData(todayPath, { startTime: scanTime }, "출근 인증이 완료되었습니다.");
        await updateData(yesterdayPath, { endTime }, "어제 퇴근 기록이 업데이트되었습니다.");
        await updateData(
          yesterdayWorkPath,
          { workHour: workHours },
          "어제 근무 시간이 업데이트되었습니다.",
        );
        await setData(todayWorkPath, {
          workHour: 0,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });

        return { success: true, message: "출근 인증이 완료되었습니다." };
      }

      // 새로운 날 출근
      if (!todayData && yesterdayData?.startTime && yesterdayData?.endTime) {
        await setData(todayPath, { startTime: scanTime }, "출근 인증이 완료되었습니다.");
        await setData(todayWorkPath, {
          workHour: 0,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });

        return { success: true, message: "출근 인증이 완료되었습니다." };
      }
    } else {
      // 최초 출근
      await setData(todayPath, { startTime: scanTime }, "출근 인증이 완료되었습니다.");
      await setData(todayWorkPath, {
        workHour: 0,
        daySalary: 0,
        nightSalary: 0,
        holidayAndWeekendSalary: 0,
      });

      return { success: true, message: "출근 인증이 완료되었습니다." };
    }

    return { success: false, error: "금일 출근, 퇴근을 이미 완료했습니다." };
  } catch (error: any) {
    console.error("Error processing QR scan:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 근무 시간 계산 (출근, 퇴근 기준)
 */
function calculateWorkHours(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  let workHours = (end.getTime() - start.getTime()) / 36e5; // 시간 단위로 변환

  if (workHours >= 9) workHours -= 1; // 점심시간 제외
  return Math.max(workHours, 0);
}
