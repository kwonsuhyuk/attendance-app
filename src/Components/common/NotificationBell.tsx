import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "@/hooks/employee/useNotification";
import NotificationDropdown from "../ui/notificationDropdown";
import { deleteNotification } from "@/api/notification.api";
import { useUserStore } from "@/store/user.store";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { unreadCount, notifications } = useNotification();
  const userId = useUserStore(state => state.currentUser?.uid);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleClickNotification = async (notificationId: string, closeDropdown = true) => {
    if (!userId) return;
    await deleteNotification(userId, notificationId);
    if (closeDropdown) setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative rounded-md p-1.5 text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          onClickNotification={handleClickNotification}
          onCloseDropdown={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
