import { useState } from "react";
import { X } from "lucide-react";
import { format, parseISO } from "date-fns";

interface NoticeCardProps {
  title: string;
  content: string;
  createdAt: string;
  onDelete?: () => void;
  noticeType?: "중요" | "일반";
}

const NoticeCard = ({ title, content, createdAt, onDelete, noticeType }: NoticeCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="self-start rounded-md border border-white-border bg-white-card-bg p-5 shadow-md transition-all duration-200 dark:border-dark-border dark:bg-dark-card-bg"
      data-tour="notice-2"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {noticeType === "중요" && (
            <span className="rounded text-sm font-semibold text-red-500">[중요]</span>
          )}
          <h3 className="text-base font-semibold text-white-text dark:text-dark-text">{title}</h3>
        </div>

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-muted-foreground hover:text-destructive"
            aria-label="삭제"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div
        className={`my-4 cursor-pointer overflow-hidden text-sm text-muted-foreground transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px]" : "max-h-[24px]"
        }`}
        onClick={() => setOpen(prev => !prev)}
      >
        <p
          className={`${!open ? "line-clamp-1" : ""}`}
          style={{ whiteSpace: "pre-line" }} //
        >
          {content}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{createdAt?.split("T")[0] ?? "-"}</span>
        {content.length > 40 && (
          <button
            onClick={() => setOpen(prev => !prev)}
            className="text-[13px] underline underline-offset-2 hover:text-white-text dark:hover:text-dark-text"
          >
            {open ? "간략히" : "자세히"}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
