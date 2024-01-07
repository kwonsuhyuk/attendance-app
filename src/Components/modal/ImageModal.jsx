import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Input } from "antd";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import AvatarEditor from "react-avatar-editor";

function ImageModal({ open, handleClose, companyName, setImageUrl }) {
  const { currentUser } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [uploadedCroppedImage, setuploadedCroppedImage] = useState("");
  const [blob, setBlob] = useState("");
  const editorRef = useRef(null);

  const closeModal = useCallback(() => {
    handleClose();
    setPreviewImage("");
    setCroppedImage("");
    setuploadedCroppedImage("");
  }, [handleClose]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setPreviewImage(reader.result);
    });
  }, []);

  const handleCropImage = useCallback(() => {
    editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setCroppedImage(imageUrl);
      setBlob(blob);
    });
  }, []);

  const uploadCroppedImage = useCallback(async () => {
    if (!currentUser?.uid) return;
    const storageRef = refStorage(getStorage(), `logo/${companyName}`);
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    setImageUrl(downloadUrl);
    setuploadedCroppedImage(downloadUrl);
    closeModal();
  }, [currentUser?.uid, blob, closeModal, companyName, setImageUrl]);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>회사 로고 사진 업로드</DialogTitle>
      <DialogContent>
        <Input
          margin="dense"
          inputprops={{ accept: "image/jpeg, image/jpg, image/png" }}
          type="file"
          fullwidth="true"
          variant="standard"
          onChange={handleChange}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          {previewImage && (
            <AvatarEditor
              ref={editorRef}
              image={previewImage}
              width={120}
              height={120}
              border={50}
              scale={2}
              style={{ display: "inline" }}
            />
          )}
          {croppedImage && (
            <img
              src={croppedImage}
              alt="cropped"
              style={{ marginLeft: "50px" }}
              width={100}
              height={100}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        {previewImage && <Button onClick={handleCropImage}>이미지 crop</Button>}
        {croppedImage && (
          <Button onClick={uploadCroppedImage}>로고 저장</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ImageModal;
