import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import gsap from "gsap";
import ImageModal from "../../Components/modal/ImageModal";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

const steps = ["회사 기본 설정", "회사 추가 설정", "직원 초대 코드"];
const id = uuidv4().slice(0, 8);

function ManagerFirstPage() {
  const { state } = useLocation();
  console.log(state);
  const [activeStep, setActiveStep] = useState(0);
  const [imageOpenModal, setImageOpenModal] = useState(false);

  // 이제 id 변수는 고유한 UUID 값을 가집니다.
  console.log(id);

  // 회사 기본 설정 state
  const [companyName, setCompanyName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 회사 추가 설정 state
  const [jobNameInput, setJobNameInput] = useState("");
  const endRef = useRef(null);
  const [isdaynight, setIsdaynight] = useState(false);
  const [isNightPay, setIsNightPay] = useState(1);
  const [isholiday, setIsholiday] = useState(false);
  const [holidayPay, setHolidayPay] = useState(1);
  const [jobTags, setJobTags] = useState([]);
  const [nightStart, setNightStart] = useState("");
  const [nightEnd, setNightEnd] = useState("");

  const handleNightStartChange = (event) => {
    setNightStart(event.target.value);
  };

  const handleNightEndChange = (event) => {
    setNightEnd(event.target.value);
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [jobTags.length]);

  const handleClickOpen = useCallback(() => {
    setImageOpenModal(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setImageOpenModal(false);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // 태그 삭제
  const handleDeleteTag = (deleteTag) => {
    const filter = jobTags.filter((tag) => tag !== deleteTag);
    setJobTags(filter);
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!jobNameInput) {
      return;
    }
    setJobTags((prev) => [...prev, { jobName: jobNameInput, defaultPay: 0 }]);
    setJobNameInput("");
  };

  const handlePayChange = (index, value) => {
    setJobTags((prev) => {
      const updatedTags = [...prev];
      updatedTags[index].defaultPay = parseInt(value) || "";
      return updatedTags;
    });
  };

  useEffect(() => {
    const text = document.querySelector(".animate-text");
    gsap.fromTo(
      text,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    );
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Stepper activeStep={activeStep} sx={{ height: "10%" }}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        // 완료되었다고 안내해주는 창
        <React.Fragment>
          <Box sx={{ height: "80%" }}>end</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Finish</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        // 회사 기본 설정 칸
        <React.Fragment>
          <Box
            sx={{
              height: "80%",
              gap: 10,
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography sx={{ fontSize: "1.5rem" }} className="animate-text">
              회사의 기본 설정을 시작하겠습니다! 기본 설정은 바꾸기 어려우니
              신중히 작성해주세요.
            </Typography>
            <Box
              sx={{
                width: "100%",
                gap: 10,
                display: "flex",
                flexDirection: "column",
              }}>
              <TextField
                required
                autoComplete="off"
                id="company_name"
                label="회사이름"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                variant="standard"
                sx={{ width: "50%" }}
              />
              <TextField
                required
                autoComplete="off"
                id="admin_name"
                label="대표자 이름"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                variant="standard"
                sx={{ width: "50%" }}
              />
              <div className="text-gray-500">
                <div>회사 로고</div>
                <div className="text-xs">
                  (이미지는 jpeg, jpg, png 형식만 등록이 가능합니다.)
                </div>
              </div>
              <div
                onClick={handleClickOpen}
                style={{
                  cursor: "pointer",
                  width: "4rem",
                  height: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "4px solid gray",
                }}>
                {!imageUrl ? (
                  "+"
                ) : (
                  <img
                    src={imageUrl}
                    alt="로고 이미지"
                    className="w-full h-full"
                  />
                )}
              </div>
              <ImageModal
                setImageUrl={setImageUrl}
                companyName={companyName}
                open={imageOpenModal}
                handleClose={handleClickClose}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 1 ? (
        // 회사 추가 설정 칸
        // 주간야간 구분 , 주간 시간, 야간 시간, 직책,
        <React.Fragment>
          <Box
            sx={{
              height: "80%",
              gap: 10,
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
            }}>
            <Typography sx={{ fontSize: "1.5rem" }} className="animate-text">
              회사의 정확한 관리를 위한 추가설정 칸 입니다. 회원가입 이후
              설정창에서 재설정할 수 있습니다.
            </Typography>
            {/* 직책 태그 */}
            <div className="text-gray-500 w-3/5">
              <div className="text-black mb-3 font-black">직책 태그 추가</div>
              <div className="text-xs mb-7">
                (회사 직원들의 직책을 분류, 정리 하기 위한 칸으로 직원들이
                가입시에 직책을 선택할 수 있고, 추후에 직원들을 직책별로
                정리해서 볼 수 있게 해주는 태그입니다.)
              </div>
              <div className="h-64 grid grid-cols-5 grid-flow-col gap-4">
                <Box
                  className="col-span-2 h-10 flex justify-start items-center"
                  component="form"
                  onSubmit={handleTagSubmit}>
                  <TextField
                    id="jobName"
                    label="직책추가"
                    value={jobNameInput}
                    onChange={(e) => setJobNameInput(e.target.value)}
                    variant="standard"
                    sx={{ width: "90%" }}
                  />
                  <AddIcon onClick={handleTagSubmit} />
                </Box>
                <ul
                  className="col-span-3 overflow-y-scroll"
                  style={{
                    borderLeft: "2px solid #e9e9e9",
                    padding: "1rem 2rem",
                  }}>
                  {jobTags.length === 0 ? (
                    <div>직책을 추가하세요.</div>
                  ) : (
                    jobTags.map((tag, index) => (
                      <li key={index}>
                        <div
                          className="flex justify-between items-center gap-3 p-3 mb-5"
                          style={{ borderBottom: "1px solid #e9e9e9" }}>
                          {tag.jobName}
                          <CloseIcon
                            className="cursor-pointer"
                            onClick={() => handleDeleteTag(tag)}
                          />
                        </div>
                      </li>
                    ))
                  )}
                  <div ref={endRef}></div>
                </ul>
              </div>
            </div>
            <div className="text-gray-500 w-3/5">
              <div className="text-black mb-3 font-black">
                직책별 기본 시급 설정
              </div>
              <div className="text-xs mb-7">
                (회사의 기본시급을 설정합니다. 직원마다 급여를 다르게 설정해야
                할 시 가입 후 직원 설정에서 직원별로 급여를 설정할 수 있으며,
                <br />
                급여가 설정되어 있지 않은 직원들은 회사의 기본 시급으로 계산이
                되는것을 주의해 주세요!)
              </div>
              <ul>
                {jobTags.length === 0 ? (
                  <div>직책을 추가하세요.</div>
                ) : (
                  jobTags.map((tag, index) => (
                    <li key={index}>
                      <div
                        className="flex justify-between items-center gap-3 p-3 mb-5 w-1/2"
                        style={{ borderBottom: "1px solid #e9e9e9" }}>
                        <div>{tag.jobName}</div>
                        <div>
                          <Input
                            type="number"
                            placeholder="기본 급여"
                            inputProps={{ min: 1 }}
                            value={tag.defaultPay.toString()}
                            onChange={(e) =>
                              handlePayChange(index, e.target.value)
                            }
                          />
                          원
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* 주간야간 시간 설정 */}
            <div className="text-gray-500 w-3/5">
              <div className="text-black mb-3 font-black">
                주간 야간 공휴일 설정
              </div>
              <div className="text-xs mb-7">
                (주간, 야간 ,공휴일 등을 구분해서 급여를 지급할지 설정합니다.)
              </div>
              <div className="grid grid-cols-2 grid-flow-col gap-4">
                <div style={{ borderRight: "2px solid #e9e9e9" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isdaynight}
                        onChange={(event) =>
                          setIsdaynight(event.target.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="주간 야간 구분"
                  />
                  {isdaynight && (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center">
                        야간 시간 설정 :
                        <Select
                          className="m-3 h-10"
                          value={nightStart}
                          onChange={handleNightStartChange}>
                          <MenuItem value="">시작 시간</MenuItem>
                          {[...Array(25)].map((_, index) => (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          ))}
                        </Select>
                        시 ~
                        <Select
                          className="m-3 h-10"
                          value={nightEnd}
                          onChange={handleNightEndChange}>
                          <MenuItem value="">끝나는 시간</MenuItem>
                          {[...Array(25)].map((_, index) => (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          ))}
                        </Select>
                        시
                      </div>
                      <div className="text-xs">
                        (주간 시간 : {nightEnd}시 ~ {nightStart}시)
                      </div>
                      <div>
                        <Input
                          type="number"
                          inputProps={{ min: 1 }}
                          value={isNightPay}
                          onChange={(e) => setIsNightPay(e.target.value)}
                        />
                        배 지급
                      </div>
                      <div className="text-sm text-blue-500">
                        기본급:10000원 일시 &gt; {isNightPay * 10000}원
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isholiday}
                        onChange={(event) => setIsholiday(event.target.checked)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="공휴일(주말) 구분"
                  />
                  {isholiday && (
                    <>
                      <div>
                        <div className="text-xs mb-3">
                          주말(토,일) 과 국가 지정 공휴일에 적용되는 시급 배율을
                          입력해주세요. <br />
                          (회사에서 지정하는 공휴일은 가입후 설정에서
                          가능합니다.)
                        </div>
                        <Input
                          type="number"
                          inputProps={{ min: 1 }}
                          value={holidayPay}
                          onChange={(e) => setHolidayPay(e.target.value)}
                        />
                        배 지급
                      </div>
                      <div className="text-sm text-blue-500">
                        기본급:10000원 일시 &gt; {holidayPay * 10000}원
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        // 회사 직원 초대 칸
        <React.Fragment>
          <Box sx={{ height: "80%" }}>
            <Typography sx={{ fontSize: "1.5rem" }} className="animate-text">
              기본적인 회사 설정을 마쳤습니다. <br />
              아래 회사Id로 직원들을 초대할 수 있고, QR코드로 직원들의 출근
              퇴근을 체크할 수 있습니다.
              <br />
              가입 후 회사 정보란에서 회사Id와 QR코드를 계속 확인할 수 있습니다.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ManagerFirstPage;
