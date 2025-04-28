import { useState, useEffect } from "react";
import { db } from "@/api"; // index.ts에서 export한 db 사용
import { ref, onValue, off } from "firebase/database";
import { useUserStore } from "@/store/user.store";

export const useEmployeeNotification = () => {
  const [unreadVacationNotifications, setUnreadVacationNotifications] = useState(0);
  const userId = useUserStore(state => state.currentUser?.uid);

  useEffect(() => {
    if (!userId) return;

    const notificationRef = ref(db, `notifications/${userId}`);

    const unsubscribe = onValue(notificationRef, snapshot => {
      const data = snapshot.val() || {};
      const unreadCount = Object.values(data).filter(
        (n: any) => n.type === "vacation_status" && !n.read,
      ).length;

      setUnreadVacationNotifications(unreadCount);
    });

    return () => {
      off(notificationRef, "value", unsubscribe); // 리스너 정리
    };
  }, [userId]);

  return { unreadVacationNotifications };
};
