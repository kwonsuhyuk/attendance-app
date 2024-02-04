import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { ClipLoader } from "react-spinners";
import "../../firebase";
import { get, getDatabase, push, ref, set } from "firebase/database";
import gsap from "gsap";
import { toast } from "react-toastify";

const steps = ["회사 직책 선택", "사용법"];

function EmployeeFirstPage() {
  const { state } = useLocation();
  const { companyCode } = state;
  const { currentUser } = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCompanyInfo, setCurrentCompanyInfo] = useState();
  const [jobList, setJobList] = useState({});
  const [selectJob, setSelectJob] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    async function getCompData() {
      setLoading(true);
      try {
        const compRef = ref(
          getDatabase(),
          "companyCode/" + companyCode + "/companyInfo"
        );
        const snapshot = await get(compRef);
        if (snapshot.exists()) {
          setCurrentCompanyInfo(snapshot.val());
          setJobList(snapshot.val().jobName);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    }
    getCompData();
  }, [companyCode]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <ClipLoader
          loading={loading}
          color="black"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  const handleGoMain = async () => {
    setLoading(true);
    handleNext();
    const db = getDatabase();
    const userRef = ref(
      db,
      `companyCode/${companyCode}/users/${currentUser.uid}`
    );
    const userData = {
      name: state.name,
      uid: state.id,
      email: currentUser.email,
      companyCode: companyCode,
      jobName: selectJob,
      userType: "employee",
    };
    try {
      await set(userRef, userData);
      setLoading(false);
      navigate(`/${companyCode}`);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

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
        <React.Fragment>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography sx={{ mt: 2, mb: 1 }} className="animate-text">
              <ClipLoader
                loading={loading}
                color="black"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Typography>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <>
          <Box
            sx={{
              height: "75%",
              padding: "0 2rem",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
            className="text-gray-500 ">
            <Typography sx={{ mt: 2, mb: 1 }} className="animate-text">
              Att-app의{" "}
              <span className="text-lg text-slate-900 underline">
                {currentCompanyInfo?.companyName}
              </span>
              <br />
              커뮤니티에 오신 것을 환영합니다!
            </Typography>
            <Box
              sx={{
                overflowY: "scroll",
              }}>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="flex flex-col"
                  sx={{ borderBottom: "1px solid #e9e9e9" }}>
                  회사 직종 선택
                  <span className="text-red-500 text-xs">
                    (직종은 관리자에 의해 임의로 재변경될 수 있습니다.)
                  </span>
                </FormLabel>
                <RadioGroup
                  sx={{ display: "flex", flexDirection: "column" }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group">
                  {jobList &&
                    Object.entries(jobList).map(([key, job], index) => (
                      <FormControlLabel
                        key={index}
                        value={job.jobName}
                        control={<Radio />}
                        label={job.jobName}
                        onChange={(e) => setSelectJob(e.target.value)}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
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
        </>
      ) : (
        <>
          <Box
            sx={{
              height: "75%",
              padding: "0 2rem",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
            className="text-gray-500 ">
            <Typography sx={{ mt: 2, mb: 1 }} className="animate-text">
              앱 사용법
            </Typography>
            <Box
              sx={{
                overflowY: "scroll",
              }}>
              {/* 간단한 앱사용법 안내 */}
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
            <Button onClick={handleGoMain}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default EmployeeFirstPage;
