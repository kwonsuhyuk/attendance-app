import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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
    reader.onload = () => {
      setPreviewImage(reader.result);
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
    };
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
    console.log("dlalss");
    closeModal();
  }, [currentUser?.uid, blob, closeModal, companyName, setImageUrl]);

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      PaperProps={{
        style: {
          width: "70%", // 모달의 너비를 화면 너비의 80%로 설정
          maxWidth: "none", // 최대 너비 제한을 없애거나 다른 값으로 설정
          height: "auto", // 모달의 높이를 자동으로 설정
          maxHeight: "90vh", // 화면 높이의 90%를 최대 높이로 설정
        },
      }}>
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
              width={imageSize.width}
              height={imageSize.height}
              border={50}
              scale={0.9}
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
