import { Box, Modal } from "@mui/material";
import { Button } from "antd";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Employee = ({ user }) => {
  const { name, email, jobName, uid } = user;
  const [detailOpen, setDetailOpen] = useState(false);

  const handleClose = () => {
    setDetailOpen(false);
  };
  const handleShowInfo = () => {
    setDetailOpen(true);
  };
  return (
    <>
      {user && (
        <>
          <div className="flex mb-5 gap-5 bg-orange-300 h-5">
            <div>{name}</div>
            <div>{email}</div>
            <div>{jobName}</div>
            <button onClick={handleShowInfo}>직원 상세보기</button>
          </div>
          <Modal
            open={detailOpen}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description">
            <Box sx={{ ...style, width: 200 }}>
              {/* 직원 상세 달력 추가 하기  */}
              <Button onClick={handleClose}>Close Child Modal</Button>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Employee;
