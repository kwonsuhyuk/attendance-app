import { useState, useEffect } from "react";
import { db } from "@/api";
import { ref, onValue, off } from "firebase/database";
import { useUserStore } from "@/store/user.store";
import { sendNotification } from "@/api/notification.api";
import { NotificationPayload } from "@/model/types/notification.type";

export const useNotification = () => {
  const userId = useUserStore(state => state.currentUser?.uid);
  const [unreadCount, setUnreadCount] = useState(0);

  // ✅ 알림 보내기
  const notify = async (payload: NotificationPayload) => {
    await sendNotification(payload);
  };

  // ✅ 실시간 알림 개수 감시
  useEffect(() => {
    if (!userId) return;

    const notificationRef = ref(db, `notifications/${userId}`);

    const unsubscribe = onValue(notificationRef, snapshot => {
      const data = snapshot.val() || {};
      const unread = Object.values(data).filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    });

    return () => {
      off(notificationRef, "value", unsubscribe);
    };
  }, [userId]);

  return { notify, unreadCount };
};
