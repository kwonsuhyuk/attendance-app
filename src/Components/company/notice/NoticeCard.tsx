import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NoticeCardProps {
  title: string;
  content: string;
  createdAt: string;
}

const NoticeCard = ({ title, content, createdAt }: NoticeCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer rounded-md border border-white-border bg-white-card-bg p-4 shadow-sm transition-all duration-200 dark:border-dark-border dark:bg-dark-card-bg"
      onClick={() => setOpen(prev => !prev)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-white-text dark:text-dark-text">{title}</h3>
          <p
            className={`mt-1 text-sm text-muted-foreground transition-all duration-200 ${
              open ? "" : "line-clamp-1"
            }`}
          >
            {content}
          </p>
        </div>
        <div className="flex flex-col items-end whitespace-nowrap pt-1 text-xs text-muted-foreground">
          <span>{createdAt}</span>
          {content.length > 40 && (
            <span className="mt-1 text-[10px] text-gray-400">
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
