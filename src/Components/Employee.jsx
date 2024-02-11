import { Box, Modal } from "@mui/material";
import { Button } from "antd";
import { useState } from "react";
import UserCalendar from "./Calendar/UserCalendar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 2,
};

const Employee = ({ user }) => {
  const { name, email, jobName, uid, salaryAmount } = user;
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
            <div>{salaryAmount}원</div>
            <button onClick={handleShowInfo}>직원 상세보기</button>
          </div>
          <Modal
            open={detailOpen}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description">
            <Box sx={{ ...style }}>
              {/* 직원 상세 달력 추가 하기  */}
              <UserCalendar user={user} />
              <div className="absolute bottom-3 right-1/2">
                <Button onClick={handleClose}>닫기</Button>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Employee;
