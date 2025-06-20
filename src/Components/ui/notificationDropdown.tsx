import { NotificationPayload, NotificationType } from "@/model/types/notification.type";
import { CheckCircle, XCircle, Info, Megaphone, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useUserStore } from "@/store/user.store";

interface NotificationDropdownProps {
  notifications: { id: string; data: NotificationPayload }[];
  onClickNotification: (id: string, closeDropdown?: boolean) => void;
  onCloseDropdown: () => void;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case "vacation_approved":
    case "outworking_approved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "vacation_rejected":
    case "outworking_rejected":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "vacation_registered":
      return <Info className="h-4 w-4 text-blue-500" />;
    default:
      return <Megaphone className="h-4 w-4 text-gray-400" />;
  }
};

const NotificationDropdown = ({
  notifications,
  onClickNotification,
  onCloseDropdown,
}: NotificationDropdownProps) => {
  const navigate = useNavigate();
  const companyCode = useUserStore(state => state.currentUser?.companyCode);

  const getLink = (type: string, relatedId?: string): string => {
    if (!companyCode) return "/";
    switch (type) {
      case "vacation_approved":
      case "vacation_rejected":
      case "vacation_registered":
        return `/${companyCode}/employee/myvacation`;
      case "notice_posted":
        return `/${companyCode}/employee/notice`;
      case "holiday_update":
        return `/${companyCode}/employee/holiday`;
      default:
        return `/${companyCode}/employee/companymain`;
    }
  };

  return (
    <div className="fixed left-0 right-0 top-12 z-50 w-full rounded-md border border-white-border bg-white p-2 shadow-md dark:border-dark-border dark:bg-dark-card-bg sm:top-14 md:top-16">
      {notifications.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">새로운 알림이 없습니다.</p>
      ) : (
        <ul className="max-h-[300px] overflow-y-auto">
          {notifications
            .filter(({ data }) => data.message) // ✅ message 없는 알림 제거
            .sort(
              (a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime(),
            )
            .map(({ id, data }) => (
              <li
                key={id}
                className="dark:hover:bg-dark-hover group flex flex-col rounded-md px-2 py-4 text-sm hover:bg-white-hover"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex flex-1 cursor-pointer items-center gap-2"
                    onClick={async () => {
                      await onClickNotification(id);
                      onCloseDropdown();
                      navigate(getLink(data.type, data.relatedId));
                    }}
                  >
                    {getIcon(data.type)}
                    <span>{data.message}</span>
                  </div>

                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(data.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>

                  <button
                    className="rounded p-1 text-xs text-gray-400 hover:text-red-500"
                    onClick={() => onClickNotification(id, false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* ✅ 알림 상세 날짜 표시 로직 */}
                {data.requestDate &&
                  (() => {
                    if (
                      data.type === "outworking_approved" ||
                      data.type === "outworking_rejected"
                    ) {
                      const formattedTime = format(parseISO(data.requestDate), "yyyy.MM.dd HH:mm");
                      return (
                        <p className="ml-6 mt-1 text-xs text-dark-nav-text">
                          요청 시간: {formattedTime}
                        </p>
                      );
                    }

                    const [start, end] = data.requestDate.split(" ~ ");
                    const formattedStart = format(parseISO(start), "yy.MM.dd");
                    const formattedEnd = format(parseISO(end), "yy.MM.dd");

                    return (
                      <p className="ml-6 mt-1 text-xs text-dark-nav-text">
                        요청 일자: {formattedStart} ~ {formattedEnd}
                      </p>
                    );
                  })()}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationDropdown;
