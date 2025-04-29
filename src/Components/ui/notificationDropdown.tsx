import { NotificationPayload } from "@/model/types/notification.type";
import { CheckCircle, XCircle, Info, Briefcase } from "lucide-react";

interface NotificationDropdownProps {
  notifications: { id: string; data: NotificationPayload }[];
  onClickNotification: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "vacation_approved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "vacation_rejected":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "notice_posted":
      return <Info className="h-4 w-4 text-blue-500" />;
    default:
      return <Briefcase className="h-4 w-4 text-gray-400" />;
  }
};

const NotificationDropdown = ({
  notifications,
  onClickNotification,
}: NotificationDropdownProps) => {
  return (
    <div className="absolute right-0 mt-2 w-[280px] rounded-md border border-white-border bg-white p-2 shadow-md dark:border-dark-border dark:bg-dark-card-bg">
      {notifications.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">새로운 알림이 없습니다.</p>
      ) : (
        <ul className="max-h-[300px] overflow-y-auto">
          {notifications.map(({ id, data }) => (
            <li
              key={id}
              onClick={() => onClickNotification(id)}
              className="hover:bg-white-hover dark:hover:bg-dark-hover flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm"
            >
              {getIcon(data.type)}
              <span className="flex-1">{data.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationDropdown;
