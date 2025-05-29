import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";
import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal";
import { TNotice } from "@/model/types/manager.type";

interface NoticeModalProps {
  onClose: () => void;
  notice: TNotice;
}

const NoticeModal = ({ onClose, notice }: NoticeModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  return (
    <DetailModal
      open
      onClose={onClose}
      title="공지사항 상세"
      icon={<StickyNote className="h-5 w-5" />}
      maxWidthClass="max-w-md"
    >
      <div className="min-h-[300px] rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between">
          <p className="text-md flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            {notice.noticeType === "중요" && (
              <span className="font-semibold text-red-500">[중요]</span>
            )}
            {title}
          </p>
          <span className="text-xs text-muted-foreground">
            {notice.createdAt?.split("T")[0] || "-"}
          </span>
        </div>

        <hr className="mb-3 border-gray-300" />

        <div
          className="ql-editor p-0 text-sm text-gray-700 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </DetailModal>
  );
};

export default NoticeModal;
