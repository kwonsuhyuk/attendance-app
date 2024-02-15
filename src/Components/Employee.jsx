import { Box, Menu, MenuItem, Modal } from "@mui/material";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import UserCalendar from "./Calendar/UserCalendar";
import "../firebase";
import { getDatabase, off, onValue, ref, update } from "firebase/database";
import { toast } from "react-toastify";
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

const paymentMethods = {
  hourPay: "시급 지급",
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
};

const Employee = ({ user }) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, salaryType } =
    user;
  const [detailOpen, setDetailOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [jobAnchorEl, setJobAnchorEl] = useState(null);
  const [paymentAnchorEl, setPaymentAnchorEl] = useState(null);
  const [jobNames, setJobNames] = useState([]);
  const [selectedJobName, setSelectedJobName] = useState(jobName);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(salaryType);
  const [salary, setSalary] = useState(salaryAmount);

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };
  useEffect(() => {
    const db = getDatabase();
    const jobRef = ref(
      db,
      "companyCode/" + companyCode + "/companyInfo/jobName"
    );
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      setJobNames(Object.values(data)); // 가져온 데이터를 state에 저장합니다
    });

    // Clean up function
    return () => {
      off(jobRef);
    };
  }, [companyCode]);

  const handleJobNameClick = (event) => {
    setJobAnchorEl(event.currentTarget);
  };

  const handlePaymentMethodClick = (event) => {
    setPaymentAnchorEl(event.currentTarget);
  };

  const handleJobNameClose = () => {
    setJobAnchorEl(null);
  };

  const handlePaymentMethodClose = () => {
    setPaymentAnchorEl(null);
  };

  const handleJobNameSelect = (jobName) => {
    setSelectedJobName(jobName);
    setJobAnchorEl(null);
  };

  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setPaymentAnchorEl(null);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
  };
  const handleShowInfo = () => {
    setDetailOpen(true);
  };
  const handleSettingClose = () => {
    setSettingOpen(false);
  };
  const handleSettingInfo = () => {
    setSettingOpen(true);
  };

  const handleSettingSubmit = () => {
    const db = getDatabase();
    const userRef = ref(db, "companyCode/" + companyCode + "/users/" + uid);

    // Update the jobName, salaryType, and salaryAmount in the database
    update(userRef, {
      jobName: selectedJobName,
      salaryType: selectedPaymentMethod,
      salaryAmount: parseInt(salary),
    })
      .then(() => {
        toast.success("정보 수정이 완료되었습니다.");
        handleSettingClose();
      })
      .catch((error) => {
        toast.error("오류가 발생하였습니다. 다시 시도해주세요.");
        console.error("Update failed: ", error);
      });
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
            <button onClick={handleSettingInfo}>직원 정보 수정</button>
          </div>
          <Modal
            open={detailOpen}
            onClose={handleDetailClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description">
            <Box sx={{ ...style }}>
              {/* 직원 상세 달력 추가 하기  */}
              <UserCalendar user={user} />
              <div className="absolute bottom-3 right-1/2">
                <Button onClick={handleDetailClose}>닫기</Button>
              </div>
            </Box>
          </Modal>
          <Modal
            open={settingOpen}
            onClose={handleSettingClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description">
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                height: "30vh",
                bgcolor: "background.paper",
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 2,
              }}>
              {/* 직원 상세 달력 추가 하기  */}
              <div className="text-2xl mb-3">직원 정보</div>
              <form className="grid grid-cols-2 gap-10">
                <div>이름 : {name}</div>
                <div>이메일 : {email}</div>
                <div>
                  직종
                  <Button
                    aria-controls="job-menu"
                    aria-haspopup="true"
                    onClick={handleJobNameClick}>
                    {selectedJobName}
                  </Button>
                  <Menu
                    id="job-menu"
                    anchorEl={jobAnchorEl}
                    keepMounted
                    open={Boolean(jobAnchorEl)}
                    onClose={handleJobNameClose}>
                    {jobNames.map((job, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleJobNameSelect(job.jobName)}>
                        {job.jobName}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                <div>
                  지급방식
                  <Button
                    aria-controls="payment-menu"
                    aria-haspopup="true"
                    onClick={handlePaymentMethodClick}>
                    {paymentMethods[selectedPaymentMethod]}
                  </Button>
                  <Menu
                    id="payment-menu"
                    anchorEl={paymentAnchorEl}
                    keepMounted
                    open={Boolean(paymentAnchorEl)}
                    onClose={handlePaymentMethodClose}>
                    {Object.entries(paymentMethods).map(([key, label]) => (
                      <MenuItem
                        key={key}
                        onClick={() => handlePaymentMethodSelect(key)}>
                        {label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <div>
                  급여 <Input value={salary} onChange={handleSalaryChange} />
                </div>
                <div className="absolute right-5 bottom-3 flex gap-3">
                  <Button onClick={handleSettingSubmit}>확인</Button>
                  <Button onClick={handleSettingClose}>취소</Button>
                </div>
              </form>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Employee;
