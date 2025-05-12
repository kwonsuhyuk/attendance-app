import { db } from "@/api";
import { ref, push, onValue, remove } from "firebase/database";
import { TNotice } from "@/model/types/manager.type";

// 공지사항 등록
export const postNotice = async (companyCode: string, notice: TNotice) => {
  const refPath = ref(db, `notices/${companyCode}`);
  await push(refPath, notice);
};

// 공지사항 실시간 조회
export const listenNotices = (companyCode: string, callback: (notices: TNotice[]) => void) => {
  const refPath = ref(db, `notices/${companyCode}`);
  onValue(refPath, snapshot => {
    const raw = snapshot.val() || {};
    const mapped = Object.entries(raw).map(([id, data]) => ({
      ...(data as TNotice),
      id,
    }));
    callback(mapped.reverse());
  });
};

// 공지사항 삭제
export const deleteNotice = async (companyCode: string, noticeId: string) => {
  const noticeRef = ref(db, `notices/${companyCode}/${noticeId}`);
  await remove(noticeRef);
};
