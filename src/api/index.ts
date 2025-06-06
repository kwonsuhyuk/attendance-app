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
