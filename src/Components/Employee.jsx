import { Box, Menu, MenuItem, Modal } from "@mui/material";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import "../firebase";
import { getDatabase, off, onValue, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { formatMoney, numToKorean } from "../util/formatMoney";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const paymentMethods = {
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
  hourPay: "시급 지급",
};

const Employee = ({ user }) => {
  const {
    name,
    email,
    jobName,
    uid,
    salaryAmount,
    companyCode,
    salaryType,
    phoneNumber,
  } = user;

  const [settingOpen, setSettingOpen] = useState(false);
  const [jobAnchorEl, setJobAnchorEl] = useState(null);
  const [paymentAnchorEl, setPaymentAnchorEl] = useState(null);
  const [jobNames, setJobNames] = useState([]);
  const [selectedJobName, setSelectedJobName] = useState(jobName);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(salaryType);
  const [salary, setSalary] = useState(salaryAmount);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const navigate = useNavigate();

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
  const handleShowInfo = () => {
    navigate(`/${companyCode}/datecheck/${uid}`);
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
        window.location.reload();
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
          <div
            className="flex justify-between md:grid md:grid-cols-7 items-center justify-items-center py-5 text-sm"
            style={{
              borderBottom: !darkMode
                ? "1px solid #00000033"
                : "1px solid #FFFFFF33",
            }}>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {name}
            </div>
            <div className="hidden md:block overflow-hidden overflow-ellipsis whitespace-nowrap">
              {email}
            </div>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {jobName}
            </div>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {paymentMethods[salaryType]}
            </div>
            <div className="hidden md:block overflow-hidden overflow-ellipsis whitespace-nowrap">
              {salaryAmount && formatMoney(parseInt(salaryAmount))}원
            </div>
            <div
              className="cursor-pointer"
              onClick={handleSettingInfo}
              style={{
                borderBottom: !darkMode
                  ? "1px solid #00000033"
                  : "1px solid #FFFFFF33",
              }}>
              수정
            </div>
            <div onClick={handleShowInfo} className="cursor-pointer">
              상세보기 & 정산 {">"}
            </div>
          </div>

          <Modal
            open={settingOpen}
            onClose={handleSettingClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            style={{ borderRadius: "10px" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "80vw",
                  sm: "30vw",
                },
                height: {
                  xs: "50vh",
                  sm: "50vh",
                },
                bgcolor: "background.paper",
                boxShadow: 24,
                pt: 4,
                px: 4,
                pb: 2,
                fontFamily: "'Noto Sans KR', sans-serif",
                color: "#333",
              }}>
              <div
                className="text-2xl mb-10"
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FF6B00",
                }}>
                직원 정보
              </div>
              <form className="flex flex-col justify-between h-2/3">
                <div
                  className="grid grid-cols-2 justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <div>
                    <strong className="text-xl font-bold">이름</strong>
                  </div>
                  <div>{name}</div>
                </div>
                <div
                  className="grid grid-cols-2 justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <div>
                    <strong className="text-xl font-bold">이메일</strong>
                  </div>
                  <div> {email}</div>
                </div>
                <div
                  className="grid grid-cols-2 justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <div>
                    <strong className="text-xl font-bold">휴대전화</strong>
                  </div>
                  <div> {phoneNumber}</div>
                </div>
                <div
                  className="grid grid-cols-2 justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <strong className="text-xl font-bold">직종</strong>
                  <Button
                    aria-controls="job-menu"
                    aria-haspopup="true"
                    onClick={handleJobNameClick}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #FF6B00",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      color: "#FF6B00",
                    }}>
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
                        onClick={() => handleJobNameSelect(job.jobName)}
                        style={{ padding: "10px 20px" }}>
                        {job.jobName}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                <div
                  className="grid grid-cols-2 justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <strong className="text-xl font-bold">지급방식</strong>
                  <Button
                    aria-controls="payment-menu"
                    aria-haspopup="true"
                    onClick={handlePaymentMethodClick}
                    style={{
                      padding: "5px 10px",
                      border: `1px solid ${
                        selectedPaymentMethod === "hourPay"
                          ? "#008000"
                          : selectedPaymentMethod === "dailyPay"
                          ? "#0000FF"
                          : "red"
                      }`,
                      borderRadius: "px",
                      marginLeft: "10px",
                      color: `${
                        selectedPaymentMethod === "hourPay"
                          ? "#008000"
                          : selectedPaymentMethod === "dailyPay"
                          ? "#0000FF"
                          : "red"
                      }`,
                    }}>
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
                        onClick={() => handlePaymentMethodSelect(key)}
                        style={{ padding: "10px 20px" }}>
                        {label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <div
                  className="grid grid-cols-2 items-center justify-items-center pb-2"
                  style={{ borderBottom: "1px solid #e9e9e9" }}>
                  <strong className="text-xl font-bold">급여</strong>{" "}
                  <div>
                    <Input
                      value={salary}
                      onChange={handleSalaryChange}
                      style={{ marginLeft: "10px" }}
                    />
                    <div className="text-xs ml-3">
                      {"="}
                      <span className="text-gray-500 underline">
                        {numToKorean(salary)}
                      </span>{" "}
                      원
                    </div>
                  </div>
                </div>

                <div className="absolute right-5 bottom-3 flex gap-3">
                  <Button
                    onClick={handleSettingSubmit}
                    style={{
                      backgroundColor: "#FF6B00",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}>
                    변경 사항 저장
                  </Button>
                  <Button
                    onClick={handleSettingClose}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}>
                    취소
                  </Button>
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
