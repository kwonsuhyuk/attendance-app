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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>회사 로고 사진 업로드</DialogTitle>
        </DialogHeader>

        {/* 파일 업로드 입력 */}
        <div className="flex flex-col gap-3 items-center">
          <Input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleChange} />

          {/*  ShadCN Avatar 적용 */}
          <div className="relative">
            <Avatar className="w-32 h-32 border border-gray-300 shadow-md">
              <AvatarImage src={previewImage} alt="회사 로고" />
              <AvatarFallback>
                <Camera className="w-10 h-10 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            {previewImage && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          {previewImage && <Button onClick={uploadImage}>로고 저장</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
