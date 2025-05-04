import { db } from "@/api";
import { ref, push, onValue } from "firebase/database";
import { TNotice } from "@/model/types/manager.type";

export const postNotice = async (companyCode: string, notice: TNotice) => {
  const refPath = ref(db, `notices/${companyCode}`);
  await push(refPath, notice);
};

export const listenNotices = (companyCode: string, callback: (notices: TNotice[]) => void) => {
  const refPath = ref(db, `notices/${companyCode}`);
  onValue(refPath, snapshot => {
    const raw = snapshot.val() || {};
    const mapped = Object.values(raw) as TNotice[];
    callback(mapped.reverse()); // 최신순 정렬
  });
};
