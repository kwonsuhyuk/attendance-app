import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Input } from "antd";

function ImageModal({ open, handleClose, setPercent, setUploading }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회사 로고 사진 업로드</DialogTitle>
      <DialogContent>
        <Input
          margin="dense"
          inputprops={{ accept: "image/jpeg, image/jpg, image/png, image/gif" }}
          type="file"
          fullwidth="true"
          variant="standard"
          // onChange={onChangeAddFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        {/* <Button onClick={handleSendFile}>전송</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default ImageModal;
