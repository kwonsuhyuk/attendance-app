import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/user.store";
import { getDownloadURL, getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import { ImageIcon, Camera } from "lucide-react";

interface IImageModalProps {
  open: boolean;
  handleClose: () => void;
  companyCode: string;
  setImageUrl: (url: string) => void;
}

const ImageModal = ({ open, handleClose, companyCode, setImageUrl }: IImageModalProps) => {
  const userId = useUserStore(state => state.currentUser?.uid);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [blob, setBlob] = useState<Blob | null>(null);

  const closeModal = useCallback(() => {
    handleClose();
    setPreviewImage("");
    setBlob(null);
  }, [handleClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result as string);
      setBlob(file);
    };
  }, []);

  const uploadImage = useCallback(async () => {
    if (!userId || !blob) return;
    const storageRef = refStorage(getStorage(), `logo/${companyCode}`);
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    setImageUrl(downloadUrl);
    closeModal();
  }, [userId, blob, closeModal, companyCode, setImageUrl]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle>회사 로고 사진 업로드</DialogTitle>
        </DialogHeader>

        {/* 파일 업로드 입력 */}
        <div className="flex flex-col items-center gap-12">
          <Input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleChange} />

          {/*  ShadCN Avatar 적용 */}
          <div className="relative">
            <Avatar className="h-32 w-32 border border-gray-300 shadow-md">
              <AvatarImage src={previewImage} alt="회사 로고" />
              <AvatarFallback>
                <Camera className="h-10 w-10 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            {previewImage && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={handleClose} variant="outline">
            취소
          </Button>
          {previewImage && <Button onClick={uploadImage}>로고 저장</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
