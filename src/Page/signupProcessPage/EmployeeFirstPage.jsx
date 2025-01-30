import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { ClipLoader } from 'react-spinners';
import '../../firebase';
import { get, getDatabase, push, ref, set } from 'firebase/database';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import { Input } from 'antd';

const steps = ['회사 직책 선택', '사용법'];

function EmployeeFirstPage() {
  const { state } = useLocation();
  const { companyCode } = state;
  const { currentUser } = useSelector(state => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCompanyInfo, setCurrentCompanyInfo] = useState();
  const [jobList, setJobList] = useState([]);
  const [selectJob, setSelectJob] = useState([]);
  const [salaryType, setSalaryType] = useState('');
  const [salaryAmount, setSalaryAmount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const text = document.querySelector('.animate-text');
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
      },
    );
  }, [activeStep]);

  useEffect(() => {
    async function getCompData() {
      setLoading(true);
      try {
        const compRef = ref(getDatabase(), 'companyCode/' + companyCode + '/companyInfo');
        const snapshot = await get(compRef);
        if (snapshot.exists()) {
          setCurrentCompanyInfo(snapshot.val());
          setJobList(snapshot.val().jobName ? Object.values(snapshot.val().jobName) : []);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    getCompData();
  }, [companyCode]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <ClipLoader loading={loading} color="black" size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  const handleGoMain = async () => {
    setLoading(true);
    if (!selectJob) {
      toast.error('직종을 선택해주세요.');
      return;
    }
    handleNext();

    const db = getDatabase();
    const userRef = ref(db, `companyCode/${companyCode}/users/${currentUser?.uid}`);
    const userData = {
      name: state.name,
      uid: state.id,
      email: currentUser.email,
      phoneNumber: state.phoneNumber,
      companyCode: companyCode,
      jobName: selectJob.jobName,
      userType: 'employee',
      salaryAmount: salaryAmount ? parseInt(salaryAmount) : 0,
      salaryType: salaryType ? salaryType : 'hourPay',
    };
    try {
      await set(userRef, userData);
      setLoading(false);
      navigate(`/${companyCode}/appguide`);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Stepper activeStep={activeStep} sx={{ height: '10%' }}>
        {steps.map(label => {
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
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
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
              height: '75%',
              padding: '0 1rem',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              gap: 5,
            }}
            className="text-gray-500 ">
            <Typography sx={{ mt: 2, mb: 1 }} className="animate-text">
              Att-app의 <span className="text-lg text-slate-900 underline">{currentCompanyInfo?.companyName}</span>
              <br />
              커뮤니티에 오신 것을 환영합니다!
            </Typography>
            <div className="text-lg font-bold text-red-300">
              회사에서 안내받은 <br />
              직종 및 급여 지급 방식 급여를 입력해주세요!
            </div>
            <Box>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="flex flex-col"
                  sx={{ borderBottom: '1px solid #e9e9e9', color: 'black' }}>
                  회사 직종 선택
                  <span className="text-red-500 text-xs">(직종은 관리자에 의해 임의로 재변경될 수 있습니다.)</span>
                </FormLabel>
                <RadioGroup
                  value={selectJob.jobName}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={e => setSelectJob(jobList.find(job => job.jobName === e.target.value))}>
                  {jobList &&
                    jobList.map((job, index) => (
                      <FormControlLabel key={index} value={job.jobName} control={<Radio />} label={job.jobName} />
                    ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="flex flex-col"
                  sx={{ borderBottom: '1px solid #e9e9e9', color: 'black' }}>
                  급여 지급 방법 및 급여 입력
                  <span className="text-red-500 text-xs">
                    (급여 지급 방법 및 급여 또한 관리자에 의해 재변경될 수 있습니다.)
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={e => setSalaryType(e.target.value)}>
                  <FormControlLabel value="monthlyPay" control={<Radio />} label="월급" />
                  <FormControlLabel value="dailyPay" control={<Radio />} label="일급" />
                  <FormControlLabel value="hourPay" control={<Radio />} label="시급" />
                </RadioGroup>
              </FormControl>

              {salaryType && (
                <>
                  <div className="text-red-500 text-xs">(본인 급여를 모르신다면 0원을 입력해주세요.)</div>
                  <Input
                    placeholder="회사에서 안내받은 급여를 입력하세요."
                    value={salaryAmount}
                    onChange={e => setSalaryAmount(e.target.value)}
                  />
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              height: '75%',
              padding: '0 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
            className="">
            <Typography sx={{ mt: 2, mb: 1 }} className="animate-text text-black font-black">
              앱 기능 및 사용법
            </Typography>
            <div className="overflow-y-auto text-sm text-black flex flex-col gap-5 leading-7">
              <div className="flex gap-3">
                <div className="text-2xl">.</div>
                <div className="border-b border-solid border-cyan-500">
                  Att-App은 QR스캔으로 자동으로 출근, 퇴근을 기록하고 월별로 쉽게 정산하기 위한 서비스입니다.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">.</div>
                <div className="border-b border-solid border-cyan-500">
                  직원 분 또한 Att-App을 통해 자신의 월별 급여를 한눈에 알아 보 실 수 있습니다.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">.</div>
                <div className="border-b border-solid border-cyan-500">
                  가입 후 <span className="font-bold"> App Guide</span> 페이지에서 자세한 앱 사용법을 알 수 있습니다.
                </div>
              </div>
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleGoMain}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default EmployeeFirstPage;
