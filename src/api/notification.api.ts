import { db } from "@/api";
import { ref, push, update, remove } from "firebase/database";
import { NotificationPayload } from "@/model/types/notification.type";

// 알림 전송 함수
export const sendNotification = async (payload: NotificationPayload) => {
  try {
    const { receiverId, ...rest } = payload;
    const notificationRef = ref(db, `notifications/${receiverId}`);
    await push(notificationRef, {
      ...rest,
    });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    throw error;
  }
};

// 알림 삭제 함수 (알림 읽음 처리 후)
export const deleteNotification = async (userId: string, notificationId: string) => {
  if (!userId || !notificationId) {
    console.error("❌ 삭제할 알림의 userId나 notificationId가 없습니다.");
    return;
  }

  try {
    const notificationRef = ref(db, `notifications/${userId}/${notificationId}`);
    await remove(notificationRef);
  } catch (error) {
    console.error("❌ 알림 삭제 실패:", error);
    throw error;
  }
};
