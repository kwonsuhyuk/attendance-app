import { useState, useEffect } from "react";
import { db } from "@/api";
import { ref, onValue, off } from "firebase/database";
import { useUserStore } from "@/store/user.store";
import { sendNotification } from "@/api/notification.api";
import { NotificationPayload } from "@/model/types/notification.type";

export const useNotification = () => {
  const userId = useUserStore(state => state.currentUser?.uid);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<{ id: string; data: NotificationPayload }[]>(
    [],
  );

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

      // notifications 배열 업데이트
      const mapped = Object.entries(data).map(([id, value]) => ({
        id,
        data: value as NotificationPayload,
      }));

      setNotifications(mapped);

      // unreadCount 업데이트
      const unread = mapped.filter(n => !n.data.read).length;
      setUnreadCount(unread);
    });

    return () => {
      off(notificationRef, "value", unsubscribe);
    };
  }, [userId]);

  return { notify, unreadCount, notifications };
};
