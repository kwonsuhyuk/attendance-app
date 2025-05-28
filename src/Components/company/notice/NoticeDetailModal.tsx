import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TNotice } from "@/model/types/manager.type";

interface NoticeModalProps {
  onClose: () => void;
  onSave?: (notice: TNotice) => void;
  notice?: TNotice;
  readOnly?: boolean;
}

const NoticeModal = ({ onClose, onSave, notice, readOnly = false }: NoticeModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  const handleSave = () => {
    if (!title || !content || !onSave) return;
    const newNotice: TNotice = {
      ...notice,
      title,
      content,
      createdAt: new Date().toISOString(),
      noticeType: "일반", // or "중요"
      id: notice?.id ?? `${Date.now()}`,
    };
    onSave(newNotice);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {readOnly ? "공지사항 상세" : "공지사항 작성"}
          </DialogTitle>
        </DialogHeader>

        {readOnly ? (
          <div className="flex flex-col gap-4 py-2 text-sm text-muted-foreground">
            <div>
              <p className="mb-1 font-semibold text-white-text dark:text-dark-text">제목</p>
              <p className="whitespace-pre-line">{title}</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-white-text dark:text-dark-text">내용</p>
              <p className="whitespace-pre-line">{content}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-2">
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={8}
            />
          </div>
        )}

        {!readOnly && (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NoticeModal;
