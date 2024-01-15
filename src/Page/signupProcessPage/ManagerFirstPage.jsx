import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import gsap from 'gsap';
import ImageModal from '../../Components/modal/ImageModal';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { numToKorean, formatMoney } from '../../util/formatMoney';
import WorkIcon from '@mui/icons-material/Work';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import '../../firebase';
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from 'firebase/database';
import { useSelector } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';
import QrGenerator from '../../Components/QR/QrGenerator';

const steps = ['회사 기본 설정', '회사 추가 설정', '직원 초대 코드'];
const companyID = uuidv4().slice(0, 8);

function ManagerFirstPage() {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [imageOpenModal, setImageOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 회사 기본 설정 state
  const [companyName, setCompanyName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // 회사 추가 설정 state
  const [jobNameInput, setJobNameInput] = useState('');
  const endRef = useRef(null);
  const [isdaynight, setIsdaynight] = useState(false);
  const [isNightPay, setIsNightPay] = useState(1);
  const [isholiday, setIsholiday] = useState(false);
  const [holidayPay, setHolidayPay] = useState(1);
  const [jobTags, setJobTags] = useState([]);
  const [nightStart, setNightStart] = useState('');
  const [nightEnd, setNightEnd] = useState('');

  const handleNightStartChange = (event) => {
    setNightStart(event.target.value);
  };

  const handleNightEndChange = (event) => {
    setNightEnd(event.target.value);
  };

  // useEffect(() => {
  //   const setTimeoutId = setTimeout(() => {
  //     endRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 200);

  //   return () => {
  //     clearTimeout(setTimeoutId);
  //   };
  // }, [jobTags.length]);

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
    setJobTags((prev) => [
      ...prev,
      { jobName: jobNameInput, payWay: 'hourPay', defaultPay: 0 },
    ]);
    setJobNameInput('');
  };

  const handlePayWayChange = (index, value) => {
    setJobTags((prevTags) => {
      const newTags = [...prevTags];
      newTags[index].payWay = value;
      return newTags;
    });
  };

  const handlePayChange = (index, value) => {
    setJobTags((prev) => {
      const updatedTags = [...prev];
      updatedTags[index].defaultPay = parseInt(value) || '';
      return updatedTags;
    });
  };

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
      }
    );
  }, [activeStep]);

  // 회사 id 복사 클릭시
  const handleCopyCompId = () => {
    navigator.clipboard
      .writeText(companyID)
      .then(() => {
        toast.success('회사 ID가 클립보드에 복사되었습니다.');
      })
      .catch(() => {
        toast.error(
          '회사 ID를 클립보드에 복사하는데 실패하였습니다. 다시 시도해주세요.'
        );
      });
  };

  const pushJobData = async () => {
    const db = getDatabase();
    jobTags.forEach((item) => {
      const jobRef = ref(db, `companyCode/${companyID}/companyInfo/jobName`);
      set(push(jobRef), {
        jobName: item.jobName,
        payWay: item.payWay,
        defaultPay: item.defaultPay,
      });
    });
  };

  // 데이터 firebase 에 전송하고 메인페이지로 이동하는 함수
  const sendDataAndGoMain = async () => {
    setLoading(true);
    handleNext();
    const db = getDatabase();
    const auth = getAuth();
    //회사 정보 data
    const companyRef1 = ref(db, `companyCode/${companyID}/`);
    const companyRef = ref(db, `companyCode/${companyID}/companyInfo`);
    const companyBasicData = {
      companyName: companyName,
      companyLogo: imageUrl,
      adminName: adminName,
      isdaynight: isdaynight,
      nightStart: nightStart,
      nightEnd: nightEnd,
      isNightPay: parseFloat(isNightPay),
      isholiday: isholiday,
      holidayPay: parseFloat(holidayPay),
    };

    // 관리자 user 정보 data
    const userRef = ref(db, `companyCode/${companyID}/users/adminUser`);
    const userData = {
      name: state.name,
      id: state.id,
      email: currentUser.email,
    };

    try {
      await updateProfile(auth.currentUser, {
        photoURL: companyID,
      });
      await set(companyRef1, {
        companyId: companyID,
      });
      // userdata 입력
      await set(userRef, userData);
      // companydata 입력
      await set(companyRef, companyBasicData);
      await pushJobData();
      setLoading(false);
      navigate(`/${companyID}`);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', margin: '0 5rem' }}>
      <Stepper activeStep={activeStep} sx={{ height: '10%' }}>
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
          <Box
            sx={{
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader
              loading={loading}
              color='black'
              size={150}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
            {loading && (
              <Typography sx={{ fontSize: '1.5rem' }} className='animate-text'>
                회사 데이터 설정하는 중
              </Typography>
            )}
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        // 회사 기본 설정 칸
        <React.Fragment>
          <Box
            sx={{
              height: '80%',
              gap: 10,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem' }} className='animate-text'>
              회사의 기본 설정을 시작하겠습니다! 기본 설정은 바꾸기 어려우니
              신중히 작성해주세요.
            </Typography>
            <Box
              sx={{
                width: '100%',
                gap: 10,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                required
                autoComplete='off'
                id='company_name'
                label='회사이름'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                variant='standard'
                sx={{ width: '50%' }}
              />
              <TextField
                required
                autoComplete='off'
                id='admin_name'
                label='대표자 이름'
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                variant='standard'
                sx={{ width: '50%' }}
              />
              <div className='text-gray-500'>
                <div>회사 로고</div>
                <div className='text-xs'>
                  (이미지는 jpeg, jpg, png 형식만 등록이 가능합니다.)
                </div>
              </div>
              <div
                onClick={handleClickOpen}
                style={{
                  cursor: 'pointer',
                  width: '4rem',
                  height: '4rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '4px solid gray',
                }}
              >
                {!imageUrl ? (
                  '+'
                ) : (
                  <img
                    src={imageUrl}
                    alt='로고 이미지'
                    className='w-full h-full'
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 1 ? (
        // 회사 추가 설정 칸
        // 주간야간 구분 , 주간 시간, 야간 시간, 직책,
        <React.Fragment>
          <Box
            sx={{
              height: '80%',
              gap: 10,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem' }} className='animate-text'>
              회사의 정확한 관리를 위한 추가설정 칸 입니다. 회원가입 이후
              설정창에서 재설정할 수 있습니다.
            </Typography>
            {/* 직책 태그 */}
            <div className='text-gray-500 w-3/5'>
              <div className='text-black mb-3 font-black'>직책 태그 추가</div>
              <div className='text-xs mb-7'>
                (회사 직원들의 직책을 분류, 정리 하기 위한 칸으로 직원들이
                가입시에 직책을 선택할 수 있고, 추후에 직원들을 직책별로
                정리해서 볼 수 있게 해주는 태그입니다.)
              </div>
              <div className='h-64 grid grid-cols-5 grid-flow-col gap-4'>
                <Box
                  className='col-span-2 h-10 flex justify-start items-center'
                  component='form'
                  onSubmit={handleTagSubmit}
                >
                  <TextField
                    id='jobName'
                    label='직책추가'
                    value={jobNameInput}
                    onChange={(e) => setJobNameInput(e.target.value)}
                    variant='standard'
                    sx={{ width: '90%' }}
                  />
                  <AddIcon onClick={handleTagSubmit} />
                </Box>
                <ul
                  className='col-span-3 overflow-y-scroll'
                  style={{
                    borderLeft: '2px solid #e9e9e9',
                    padding: '1rem 2rem',
                  }}
                >
                  {jobTags.length === 0 ? (
                    <div>직책을 추가하세요.</div>
                  ) : (
                    jobTags.map((tag, index) => (
                      <li key={index}>
                        <div
                          className='flex justify-between items-center gap-3 p-3 mb-5'
                          style={{ borderBottom: '1px solid #e9e9e9' }}
                        >
                          {tag.jobName}
                          <CloseIcon
                            className='cursor-pointer'
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
            <div className='text-gray-500'>
              <div className='text-black mb-3 font-black'>
                직책별 기본 급여 설정
              </div>
              <div className='text-xs mb-7'>
                (회사의 기본 급여을 설정합니다. 직원마다 급여를 다르게 설정해야
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
                        className='flex justify-between items-center gap-3 p-3 mb-5 w-1/2'
                        style={{ borderBottom: '1px solid #e9e9e9' }}
                      >
                        <div>{tag.jobName}</div>
                        <FormControl>
                          <FormLabel
                            id='demo-controlled-radio-buttons-group'
                            sx={{
                              color: 'black',
                              borderBottom: '2px solid #e9e9e9',
                            }}
                          >
                            급여 지급 방법
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name='controlled-radio-buttons-group'
                            value={tag.payWay}
                            onChange={(e) =>
                              handlePayWayChange(index, e.target.value)
                            }
                          >
                            <FormControlLabel
                              label='월급 지급'
                              control={<Radio />}
                              value='monthlyPay'
                            />
                            <FormControlLabel
                              label='일당 지급'
                              control={<Radio />}
                              value='dailyPay'
                            />
                            <FormControlLabel
                              label='시급 지급'
                              control={<Radio />}
                              value='hourPay'
                            />
                          </RadioGroup>
                        </FormControl>
                        <div>
                          <Input
                            type='number'
                            placeholder='기본 급여'
                            inputProps={{ min: 1 }}
                            value={tag.defaultPay.toString()}
                            onChange={(e) =>
                              handlePayChange(index, e.target.value)
                            }
                          />
                          원
                          {tag.payWay === 'monthlyPay'
                            ? '/Month'
                            : tag.payWay === 'dailyPay'
                            ? '/Day'
                            : '/Hour'}
                          <div className='text-xs'>
                            = {numToKorean(tag.defaultPay)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* 주간야간 시간 설정 */}
            <div className='text-gray-500 w-3/5'>
              <div className='text-black mb-3 font-black'>
                주간 야간 공휴일 설정
              </div>
              <div className='text-xs mb-7'>
                (주간, 야간 ,공휴일 등을 구분해서 급여를 지급할지 설정합니다.)
              </div>
              <div className='grid grid-cols-2 grid-flow-col gap-4'>
                <div style={{ borderRight: '2px solid #e9e9e9' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isdaynight}
                        onChange={(event) =>
                          setIsdaynight(event.target.checked)
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label='주간 야간 구분'
                  />
                  {isdaynight && (
                    <div className='flex flex-col gap-5'>
                      <div className='flex items-center'>
                        야간 시간 설정 :
                        <Select
                          className='m-3 h-10'
                          value={nightStart}
                          onChange={handleNightStartChange}
                        >
                          <MenuItem value=''>시작 시간</MenuItem>
                          {[...Array(25)].map((_, index) => (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          ))}
                        </Select>
                        시 ~
                        <Select
                          className='m-3 h-10'
                          value={nightEnd}
                          onChange={handleNightEndChange}
                        >
                          <MenuItem value=''>끝나는 시간</MenuItem>
                          {[...Array(25)].map((_, index) => (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          ))}
                        </Select>
                        시
                      </div>
                      <div className='text-xs'>
                        (주간 시간 : {nightEnd}시 ~ {nightStart}시)
                      </div>
                      <div>
                        <Input
                          type='number'
                          inputProps={{ min: 1 }}
                          value={isNightPay}
                          onChange={(e) => setIsNightPay(e.target.value)}
                        />
                        배 지급
                      </div>
                      <div className='text-sm text-blue-500'>
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
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label='공휴일(주말) 구분'
                  />
                  {isholiday && (
                    <>
                      <div>
                        <div className='text-xs mb-3'>
                          주말(토,일) 과 국가 지정 공휴일에 적용되는 시급 배율을
                          입력해주세요. <br />
                          (회사에서 지정하는 공휴일은 가입후 설정에서
                          가능합니다.)
                        </div>
                        <Input
                          type='number'
                          inputProps={{ min: 1 }}
                          value={holidayPay}
                          onChange={(e) => setHolidayPay(e.target.value)}
                        />
                        배 지급
                      </div>
                      <div className='text-sm text-blue-500'>
                        기본급:10000원 일시 &gt; {holidayPay * 10000}원
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        // 회사 직원 초대 칸
        <React.Fragment>
          <Box
            sx={{
              height: '80%',
              gap: 10,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem' }} className='animate-text'>
              기본적인 회사 설정을 마쳤습니다. 지금까지 입력하신 회사 정보 및
              설정을 확인 해주세요. <br />
              <span className='bg-yellow-200'>
                아래 회사ID로 직원들을 초대할 수 있고
              </span>
              {'    '}
              <span className='bg-green-200'>
                QR코드로 직원들의 출근 퇴근을 체크할 수 있습니다.
              </span>
              <br />
              가입 후 회사 정보란에서 회사ID와 QR코드를 계속 확인할 수 있습니다.
            </Typography>
            <div className='grid grid-cols-2 gap-10 h-full'>
              <div
                className='flex flex-col gap-5'
                style={{ borderRight: '2px solid #e9e9e9' }}
              >
                {/* 입력한 회사정보 확인 시켜주는 칸 */}
                <div className='flex items-center justify-center gap-3 relative'>
                  {imageUrl && (
                    <img
                      style={{ borderRadius: '50%' }}
                      src={imageUrl}
                      alt='로고 이미지'
                      className='w-20 h-20'
                    />
                  )}
                  <span
                    className='text-3xl'
                    style={{ fontFamily: 'Roboto Slab' }}
                  >
                    {companyName}
                  </span>
                  <span className='absolute bottom-0 right-10 text-xs'>
                    대표:{adminName}
                  </span>
                </div>
                <div style={{ borderBottom: '1px solid #e9e9e9 w-1' }}></div>
                {/* 직책보여줌 */}
                <div className='text-black font-black flex items-center gap-3'>
                  <WorkIcon />
                  직책{' '}
                  <span className='text-xs text-gray-500 font-thin'>
                    (보여지는 급여는 기본 설정 급여이며, 직원별 급여는 가입 후
                    직원별로 설정하실 수 있습니다.)
                  </span>
                </div>
                <ul className='text-base text-gray-500 flex flex-col gap-5 mb-10'>
                  {jobTags.map((tagEl, index) => (
                    <li
                      key={index}
                      className='flex gap-5 items-end'
                      style={{ borderBottom: '1px solid #e9e9e9' }}
                    >
                      <div className='text-lg text-gray-800'>
                        {tagEl.jobName}
                      </div>
                      <div>{tagEl.payWay}</div>
                      <div>{formatMoney(tagEl.defaultPay)}원</div>
                    </li>
                  ))}
                </ul>
                {/* 주말 야간 , 공휴일 선택 유무 배당 확인 */}
                <div className='text-black mb-3 font-black flex items-center gap-3'>
                  <DateRangeIcon />
                  주간 야간 공휴일 구분 여부
                </div>
                <div className='grid grid-cols-2 h-full gap-3'>
                  <div
                    style={{ borderRight: '1px solid #e9e9e9' }}
                    className='flex flex-col gap-5'
                  >
                    <div className='text-gray-800 font-black flex items-center gap-3'>
                      주간 야간 구분 여부 {isdaynight ? 'O' : 'X'}
                    </div>
                    {isdaynight && (
                      <ul className='text-gray-500 flex flex-col gap-3'>
                        <li>
                          * 주간 시간: {nightEnd}시 ~ {nightStart}시
                        </li>
                        <li>
                          * 야간 시간: {nightStart}시 ~ {nightEnd}시
                        </li>
                        <li>* 추가 급여 배율 : {isNightPay}배 지급</li>
                      </ul>
                    )}
                  </div>
                  <div className='flex flex-col gap-5'>
                    <div className='text-gray-800 font-black flex items-center gap-3'>
                      공휴일 구분 여부 {isholiday ? 'O' : 'X'}
                    </div>
                    {isholiday && (
                      <ul className='text-gray-500 flex flex-col gap-3'>
                        <li>* 추가 급여 배율 : {holidayPay}배 지급</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-10'>
                {/* qr,id 제공해주는 칸 */}
                <div className='flex flex-col gap-5'>
                  <div className='font-black text-3xl'>직원 초대 ID 코드</div>
                  <div
                    className='bg-gray-500 w-4/5 h-10 flex justify-center items-center text-white relative'
                    style={{ borderRadius: '20px' }}
                  >
                    {companyID}
                    <span className='absolute right-7 cursor-pointer'>
                      <ContentCopyIcon onClick={handleCopyCompId} />
                    </span>
                  </div>
                </div>
                {/* qr코드 제공 */}
                <div
                  style={{ borderTop: '1px solid #e9e9e9' }}
                  className='flex flex-col gap-8'
                >
                  <div className='font-black text-3xl mt-3'>
                    출근 퇴근 체크 QR 코드
                  </div>
                  <div className='flex flex-col justify-center items-center gap-3'>
                    {/* qr 예시 이미지 */}
                    <QrGenerator />
                    {/* <img
                      src="data:image/jpeg;base64,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"
                      alt="iu"
                      className="w-72 h-72"
                    />
                    <div
                      className="flex justify-center items-center bg-gray-500 p-2"
                      style={{ borderRadius: "20px" }}>
                      <a
                        href="data:image/jpeg;base64,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"
                        download
                        className="text-white">
                        QR 다운로드
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={sendDataAndGoMain}>Finish</Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ManagerFirstPage;
