import { db } from "@/api";
import { ref, push, update } from "firebase/database";

export const sendNotification = async (
  userId: string,
  type: "vacation_status" | "notice" | "holiday_update",
  message: string,
) => {
  try {
    const notificationRef = ref(db, `notifications/${userId}`);
    await push(notificationRef, {
      type,
      message,
      createdAt: Date.now(),
      read: false,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  try {
    const notificationRef = ref(db, `notifications/${userId}/${notificationId}`);
    await update(notificationRef, { read: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
