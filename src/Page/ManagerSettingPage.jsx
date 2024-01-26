import React, { useEffect, useState } from "react";
import "../firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  Box,
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { numToKorean } from "../util/formatMoney";
import { Button } from "antd";
import { toast } from "react-toastify";

const ManagerSettingPage = () => {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [companyName, setCompanyName] = useState("");
  const [jobName, setJobTags] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [isdaynight, setIsdaynight] = useState();
  const [isholiday, setIsHoliday] = useState();
  const [holidayPay, setHolidayPay] = useState(0);
  const [isNightPay, setIsNightPay] = useState(0);
  const [nightEnd, setNightEnd] = useState(0);
  const [nightStart, setNightStart] = useState(0);
  const [jobNameInput, setJobNameInput] = useState("");

  const handleInfoUpdate = async () => {
    await set(
      ref(
        getDatabase(),
        "companyCode/" + currentUser.photoURL + "/companyInfo"
      ),
      {
        ...companyData,
        isNightPay: parseFloat(isNightPay),
        holidayPay: parseFloat(holidayPay),
        isholiday,
        isdaynight,
        nightEnd,
        nightStart,
        jobName,
      }
    );
    toast.success("정보 수정을 완료하였습니다.");
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const snapshot = await get(
        ref(
          getDatabase(),
          "companyCode/" + currentUser.photoURL + "/companyInfo"
        )
      );
      const data = snapshot?.val();
      console.log(data);
      setCompanyData(data);

      setIsLoading(false);
    }

    getData();

    return () => {
      setCompanyData([]);
    };
  }, [currentUser.photoURL]);

  const handlePayChange = (tagKey, value) => {
    setJobTags((prev) => {
      const updatedTags = { ...prev };
      updatedTags[tagKey].defaultPay = parseInt(value) || "";
      return updatedTags;
    });
  };

  const handlePayWayChange = (tagKey, value) => {
    setJobTags((prevTags) => {
      const newTags = { ...prevTags };
      newTags[tagKey].payWay = value;
      return newTags;
    });
  };

  useEffect(() => {
    if (companyData) {
      setCompanyLogo(companyData.companyLogo);
      setCompanyName(companyData.companyName);
      setIsdaynight(companyData.isdaynight);
      setIsHoliday(companyData.isholiday);
      setHolidayPay(companyData.holidayPay);
      setIsNightPay(companyData.isNightPay);
      setJobTags(companyData.jobName);
      setNightEnd(companyData.nightEnd);
      setNightStart(companyData.nightStart);
    }
  }, [companyData]);

  // 태그 삭제
  const handleDeleteTag = (deleteTagKey) => {
    setJobTags((prev) => {
      const updatedTags = { ...prev };
      delete updatedTags[deleteTagKey];
      return updatedTags;
    });
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!jobNameInput) {
      return;
    }
    setJobTags((prev) => ({
      ...prev,
      [uuidv4()]: {
        jobName: jobNameInput,
        payWay: "hourPay",
        defaultPay: 0,
      },
    }));

    setJobNameInput("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <ClipLoader
          color="black"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>로딩 중입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <div className="flex flex-col gap-5">
      managerSettingPage
      <div className="flex flex-col w-1/4">
        회사 이름
        <div className="flex">
          <Input disabled value={companyName} />
        </div>
      </div>
      <div className="flex flex-col w-1/4">
        회사 로고{" "}
        <img
          src={companyLogo}
          alt="logo"
          className="w-20 h-20"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="flex flex-col w-2/3">
        직책 수정
        <div>
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
              {Object.entries(jobName).map(([tagKey, tag], index) => (
                <li key={index}>
                  <div
                    className="flex justify-between items-center gap-3 p-3 mb-5"
                    style={{ borderBottom: "1px solid #e9e9e9" }}>
                    {tag.jobName}
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={() => handleDeleteTag(tagKey)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-gray-500">
        <div className="text-black mb-3 font-black">직책별 기본 급여 설정</div>
        <div className="text-xs mb-7">
          (회사의 기본 급여을 설정합니다. 직원마다 급여를 다르게 설정해야 할 시
          가입 후 직원 설정에서 직원별로 급여를 설정할 수 있으며,
          <br />
          급여가 설정되어 있지 않은 직원들은 회사의 기본 시급으로 계산이
          되는것을 주의해 주세요!)
        </div>
        <ul>
          {Object.entries(jobName).map(([tagKey, tag], index) => (
            <li key={index}>
              <div
                className="flex justify-between items-center gap-3 p-3 mb-5 w-1/2"
                style={{ borderBottom: "1px solid #e9e9e9" }}>
                <div>{tag.jobName}</div>
                <FormControl>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{
                      color: "black",
                      borderBottom: "2px solid #e9e9e9",
                    }}>
                    급여 지급 방법
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={tag.payWay}
                    onChange={(e) =>
                      handlePayWayChange(tagKey, e.target.value)
                    }>
                    <FormControlLabel
                      label="월급 지급"
                      control={<Radio />}
                      value="monthlyPay"
                    />
                    <FormControlLabel
                      label="일당 지급"
                      control={<Radio />}
                      value="dailyPay"
                    />
                    <FormControlLabel
                      label="시급 지급"
                      control={<Radio />}
                      value="hourPay"
                    />
                  </RadioGroup>
                </FormControl>
                <div>
                  <Input
                    type="number"
                    placeholder="기본 급여"
                    inputProps={{ min: 1 }}
                    value={tag.defaultPay.toString()}
                    onChange={(e) => handlePayChange(tagKey, e.target.value)}
                  />
                  원
                  {tag.payWay === "monthlyPay"
                    ? "/Month"
                    : tag.payWay === "dailyPay"
                    ? "/Day"
                    : "/Hour"}
                  <div className="text-xs">= {numToKorean(tag.defaultPay)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-2/3">
        주간 야간 공휴일 설정
        <div className="text-xs mb-7">
          (주간, 야간 ,공휴일 등을 구분해서 급여를 지급할지 설정합니다.)
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div style={{ borderRight: "2px solid #e9e9e9" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isdaynight}
                  onChange={(event) => setIsdaynight(event.target.checked)}
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
                    onChange={(e) => setNightStart(e.target.value)}>
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
                    onChange={(e) => setNightEnd(e.target.value)}>
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
                  onChange={(event) => setIsHoliday(event.target.checked)}
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
                    (회사에서 지정하는 공휴일은 가입후 설정에서 가능합니다.)
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
      <div className="w-2/3 flex justify-center">
        <Button onClick={handleInfoUpdate}>완료</Button>
      </div>
    </div>
  );
};

export default ManagerSettingPage;
