import { useEffect, useState } from "react";
import "@/firebase";
import { get, getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Box, Checkbox, FormControlLabel, Input, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { Button } from "antd";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Loading from "@/components/common/Loading";
import { useUserStore } from "@/store/user.store";
import QrGenerator from "@/components/employee/qr/QrGenerator";

const ManagerSettingBasicPage = () => {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const companyCode = useUserStore(state => state.currentUser.companyCode);
  const [jobName, setJobTags] = useState([]);
  const [isdaynight, setIsdaynight] = useState();
  const [isNightPay, setIsNightPay] = useState(0);
  const [nightEnd, setNightEnd] = useState(0);
  const [nightStart, setNightStart] = useState(0);
  const [jobNameInput, setJobNameInput] = useState("");
  const [day, setDay] = useState(1);

  const { darkMode } = useSelector(state => state.darkmodeSlice);
  const handleInfoUpdate = async () => {
    await set(ref(getDatabase(), "companyCode/" + companyCode + "/companyInfo"), {
      ...companyData,
      isNightPay: parseFloat(isNightPay),
      isdaynight,
      nightEnd: parseInt(nightEnd),
      nightStart: parseInt(nightStart),
      jobName,
      payCheckDay: day,
    });
    toast.success("정보 수정을 완료하였습니다.");
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const snapshot = await get(ref(getDatabase(), "companyCode/" + companyCode + "/companyInfo"));
      const data = snapshot?.val();
      setCompanyData(data);
      setIsLoading(false);
    }

    getData();

    return () => {
      setCompanyData([]);
    };
  }, [companyCode]);

  // const handlePayChange = (tagKey, value) => {
  //   setJobTags((prev) => {
  //     const updatedTags = { ...prev };
  //     updatedTags[tagKey].defaultPay = parseInt(value) || "";
  //     return updatedTags;
  //   });
  // };

  // const handlePayWayChange = (tagKey, value) => {
  //   setJobTags((prevTags) => {
  //     const newTags = { ...prevTags };
  //     newTags[tagKey].payWay = value;
  //     return newTags;
  //   });
  // };

  useEffect(() => {
    if (companyData) {
      setDay(companyData.payCheckDay);
      setIsdaynight(companyData.isdaynight);
      setIsNightPay(companyData.isNightPay);
      setJobTags(companyData.jobName);
      setNightEnd(companyData.nightEnd);
      setNightStart(companyData.nightStart);
    }
  }, [companyData]);

  // 태그 삭제
  const handleDeleteTag = deleteTagKey => {
    setJobTags(prev => {
      const updatedTags = { ...prev };
      delete updatedTags[deleteTagKey];
      return updatedTags;
    });
  };

  const handleTagSubmit = e => {
    e.preventDefault();
    if (!jobNameInput) {
      return;
    }
    setJobTags(prev => ({
      ...prev,
      [uuidv4()]: {
        jobName: jobNameInput,
        // payWay: "hourPay",
        // defaultPay: 0,
      },
    }));

    setJobNameInput("");
  };
  const handlePayCheckDayChange = event => {
    setDay(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }
  // 회사 id 복사 클릭시
  const handleCopyCompId = () => {
    navigator.clipboard
      .writeText(companyCode)
      .then(() => {
        toast.success("회사 ID가 클립보드에 복사되었습니다.");
      })
      .catch(() => {
        toast.error("회사 ID를 클립보드에 복사하는데 실패하였습니다. 다시 시도해주세요.");
      });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-36">
        <div className="flex flex-col gap-7" data-tour="step-20">
          <div>
            <div className="font-black">회사 QR , ID코드</div>
            <div className="grid grid-cols-2">
              <QrGenerator />
              <div className="flex flex-col justify-center items-center">
                <div
                  className="bg-gray-500 w-4/5 h-10 flex justify-center items-center text-white relative"
                  style={{ borderRadius: "20px" }}
                >
                  {companyCode}
                  <span className="absolute right-7 cursor-pointer">
                    <ContentCopyIcon onClick={handleCopyCompId} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="font-black">직종 수정</div>
          <div>
            <div className="h-64 grid grid-cols-5 grid-flow-col gap-4">
              <Box
                className="col-span-2 h-10 flex justify-start items-center"
                component="form"
                onSubmit={handleTagSubmit}
              >
                <input
                  type="text"
                  id="jobName"
                  value={jobNameInput}
                  placeholder="직종을 추가하세요"
                  className="bg-transparent focus:outline-none h-full text-base"
                  onChange={e => setJobNameInput(e.target.value)}
                  style={{
                    width: "90%",
                    maxWidth: { xs: "150px", sm: "48rem" },
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    border: "none",
                    borderBottom: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
                    color: !darkMode ? "black" : "white",
                  }}
                />

                <AddIcon onClick={handleTagSubmit} />
              </Box>
              <ul
                className="col-span-3 overflow-y-auto"
                style={{
                  padding: "1rem 2rem",
                  borderLeft: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
                }}
              >
                {Object.entries(jobName).map(([tagKey, tag], index) => (
                  <li key={index}>
                    <div
                      className="flex justify-between items-center gap-3 p-3 mb-5"
                      style={{
                        borderBottom: !darkMode ? "1px solid #00000033" : "1px solid #FFFFFF33",
                      }}
                    >
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

        <div className="flex flex-col gap-7" data-tour="step-21">
          <div className="mb-3 font-black">급여 정산 날짜 입력</div>
          <div>
            매월
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={day}
              className="h-10 ml-5"
              sx={{
                color: !darkMode ? "black" : "white",
                border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
              }}
              onChange={handlePayCheckDayChange}
            >
              {[...Array(31)].map((x, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
            일
            <div className="text-xs mt-3">
              (급여 정산 기능 이용 시,전 달 <span className="text-red-500">{day}</span>일 부터{" "}
              {day != 1 ? "이번 달 " : "전 달 "}
              <span className="text-red-500">{day === 1 ? 31 : day - 1}</span>일 까지 급여를
              계산합니다.)
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7" data-tour="step-22">
          <div className="mb-3 font-black">주간 야간 설정</div>
          <div className="text-xs">(주간, 야간을 구분해서 급여를 지급할지 설정합니다.)</div>
          <div className="grid grid-cols-2 grid-flow-col gap-4">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: !darkMode ? "black" : "white" }}
                    checked={isdaynight}
                    onChange={event => setIsdaynight(event.target.checked)}
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
                      sx={{ color: !darkMode ? "black" : "white" }}
                      onChange={e => setNightStart(e.target.value)}
                    >
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
                      sx={{ color: !darkMode ? "black" : "white" }}
                      onChange={e => setNightEnd(e.target.value)}
                    >
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
                      sx={{ color: !darkMode ? "black" : "white" }}
                      onChange={e => setIsNightPay(e.target.value)}
                    />
                    배 지급
                  </div>
                  <div className="text-sm text-blue-500">
                    기본급:10000원 일시 &gt; {isNightPay * 10000}원
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button onClick={handleInfoUpdate} data-tour="step-23">
            변경 사항 저장
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManagerSettingBasicPage;

{
  /* <div className="text-gray-500">
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
      </div> */
}
