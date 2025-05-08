import { useEffect, useState } from "react";
import { TNotice } from "@/model/types/manager.type";
import { postNotice, listenNotices, deleteNotice } from "@/api/notice.api";
import { fetchEmployees } from "@/api/employee.api";
import { useUserStore } from "@/store/user.store";
import { sendNotification } from "@/api/notification.api";

export const useNotice = () => {
  const [notices, setNotices] = useState<TNotice[]>([]);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);

  useEffect(() => {
    if (!companyCode) return;
    return listenNotices(companyCode, setNotices);
  }, [companyCode]);

  const addNotice = async (notice: TNotice) => {
    if (!companyCode || !userId) return;

    await postNotice(companyCode, notice);

    const employees = await fetchEmployees(companyCode);

    for (const emp of employees) {
      await sendNotification({
        receiverId: emp.uid,
        type: "notice_posted",
        message: "새로운 공지사항이 었습니다.",
        createdAt: Date.now(),
        read: false,
        senderId: userId,
      });
    }
  };

  const deleteNoticeItem = async (noticeId: string) => {
    if (!companyCode) return;
    await deleteNotice(companyCode, noticeId);
  };

  return { notices, addNotice, deleteNotice: deleteNoticeItem };
};
