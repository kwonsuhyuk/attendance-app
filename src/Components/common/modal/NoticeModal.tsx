import { useState } from "react";
import RegisterModal from "@/components/common/modal/commonModalLayout/RegisterModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TNoticeType } from "@/model/types/manager.type";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    <RegisterModal open onClose={onClose} title="공지사항 작성">
      <div className="space-y-5">
        <RadioGroup
          value={noticeType}
          onValueChange={val => setNoticeType(val as TNoticeType)}
          className="mt-3 flex gap-3"
        >
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

        <div className="flex flex-col gap-5 pb-10">
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <ReactQuill value={content} onChange={setContent} style={{ height: "200px" }} />
        </div>

        <Button className="w-full" onClick={handleSave}>
          저장
        </Button>
      </div>
    </RegisterModal>
  );
};

export default NoticeModal;
