import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TNoticeType } from "@/model/types/manager.type";

interface NoticeModalProps {
  onClose: () => void;
  onSave: (notice: {
    title: string;
    content: string;
    createdAt: string;
    noticeType: TNoticeType;
  }) => void;
}

const NoticeModal = ({ onClose, onSave }: NoticeModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noticeType, setNoticeType] = useState<TNoticeType>("일반");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      title,
      content,
      createdAt: new Date().toISOString(),
      noticeType,
    });
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>공지사항 작성</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <RadioGroup
            value={noticeType}
            onValueChange={val => setNoticeType(val as TNoticeType)}
            className="mt-3 flex gap-2"
          >
            <div className="text-sm">공지 유형 :</div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="일반" id="general" />
              <label htmlFor="general" className="text-sm">
                일반
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="중요" id="important" />
              <label htmlFor="important" className="text-sm">
                중요
              </label>
            </div>
          </RadioGroup>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeModal;
