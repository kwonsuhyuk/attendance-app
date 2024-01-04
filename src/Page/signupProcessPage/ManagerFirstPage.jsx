import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { LinearProgress, TextField, Typography } from "@mui/material";
import gsap from "gsap";
import ImageModal from "../../Components/modal/ImageModal";
import { Grid } from "antd";

const steps = ["회사 기본 설정", "회사 추가 설정", "직원 초대 코드"];

function ManagerFirstPage() {
  const { state } = useLocation();
  console.log(state);
  const [activeStep, setActiveStep] = useState(0);
  const [imageOpenModal, setImageOpenModal] = useState(false);
  const [percent, setPercent] = useState(0);
  const [uploading, setUploading] = useState(false);

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

  useEffect(() => {
    const text = document.querySelector(".animate-text");

    // 한 글자씩 나타나는 애니메이션 설정
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
  }, []);

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
            <Button onClick={handleReset}>Reset</Button>
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
            <Typography sx={{ fontSize: "2rem" }} className="animate-text">
              회사의 기본 설정을 시작하겠습니다! 기본 설정은 바꾸기 어려우니
              신중히 작성해주세요.
            </Typography>
            <Box
              component="form"
              sx={{
                width: "100%",
                gap: 10,
                display: "flex",
                flexDirection: "column",
              }}>
              <TextField
                id="company_name"
                label="회사이름"
                variant="standard"
                sx={{ width: "50%" }}
              />
              <div onClick={handleClickOpen} className="text-gray-500">
                회사 로고
              </div>
              <div
                style={{
                  cursor: "pointer",
                  width: "4rem",
                  height: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "4px solid gray",
                }}>
                +
              </div>
              {uploading ? (
                <Grid item xs={12} sx={{ m: "10px" }}>
                  <LinearProgress variant="determinate" value={percent} />
                </Grid>
              ) : null}
              <ImageModal
                open={imageOpenModal}
                handleClose={handleClickClose}
                setPercent={setPercent}
                setUploading={setUploading}
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
        <React.Fragment>
          <Box sx={{ height: "80%" }}>2</Box>
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
          <Box sx={{ height: "80%" }}>3</Box>
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
