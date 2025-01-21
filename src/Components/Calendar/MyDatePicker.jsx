import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  child,
  getDatabase,
  push,
  ref,
  set,
  update,
  get,
  remove,
  onValue,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./MyDatePicker.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import { Checkbox, FormControlLabel, Input } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Button } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { useTour } from "@reactour/tour";
import Loading from "../common/Loading";

const MyDatePicker = () => {
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드
  const [anchorEl, setAnchorEl] = useState(null);
  const [isholiday, setIsHoliday] = useState();
  const [holidayPay, setHolidayPay] = useState(0);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedHolidays, setUpdatedHolidays] = useState(selectedHolidays);
  const { isOpen, setCurrentStep, setSteps } = useTour();
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(6);
        setSteps((prev) => [
          ...prev,
          {
            selector: '[data-tour="step-25"]',
            content: `공휴일을 구분해 급여 배율을 다르게 할지 설정하는 페이지 입니다. 마찬가지로 체크항목을 체크시에 공휴일 급여 배율을 설정할 수 있습니다.`,
          },
          {
            selector: '[data-tour="step-26"]',
            content: `위의 달력의 회사 자체 공휴일로 설정할 날짜를 더블클릭하여 추가 할 수 있습니다.`,
          },
          {
            selector: '[data-tour="step-27"]',
            content: `회사 공휴일로 설정한 날짜는 여기 리스트로 보실 수 있습니다.`,
          },
          {
            selector: '[data-tour="step-28"]',
            content: `마찬가지로 변경사항을 저장시에는 반드시 아래 저장버튼을 클릭하셔야 반영됩니다.`,
          },
          {
            selector: '[data-tour="step-29"]',
            content: `가이드가 다시 보고 싶으시다면 각 페이지에 GUIDE 버튼을 클릭하시면 언제든지 다시 보실 수 있습니다! 
감사합니다.`,
          },
        ]);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const snapshot = await get(
        ref(
          getDatabase(),
          "companyCode/" + currentUser?.photoURL + "/companyInfo"
        )
      );
      const data = snapshot?.val();
      setIsHoliday(data?.isholiday);
      setHolidayPay(data?.holidayPay);
      setIsLoading(false);
    }

    getData();
  }, [currentUser?.photoURL]);
  //popover
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const fetchHolidays = async () => {
      const dbref = ref(
        getDatabase(),
        `companyCode/${companyCode}/companyInfo/holidayList`
      );
      const snapshot = await get(dbref);
      if (snapshot.exists()) {
        let holidays = snapshot.val();
        let dates = Object.keys(holidays).map((dateStr) => new Date(dateStr));
        setSelectedHolidays(dates);
        setUpdatedHolidays(dates); // 초기값으로 설정
      } else {
        setSelectedHolidays([]);
        setUpdatedHolidays([]);
      }
    };

    fetchHolidays();
  }, [companyCode]);

  const handleDateSelect = (date, event) => {
    if (event.detail === 2) {
      // 더블 클릭 이벤트 확인
      handleDateAdd(date);
    }
  };

  const handleDateAdd = (date) => {
    const isAlreadySelected = updatedHolidays.some(
      (d) => d.getTime() === date.getTime()
    );

    if (!isAlreadySelected) {
      // 새로운 공휴일이면 추가
      setUpdatedHolidays((prevHolidays) => [...prevHolidays, date]);
    }
  };

  const handleDateRemove = (dateToRemove) => {
    setUpdatedHolidays((prevHolidays) =>
      prevHolidays.filter((date) => date.getTime() !== dateToRemove.getTime())
    );
  };

  const handleSaveChanges = async () => {
    const holidayList = updatedHolidays.reduce((obj, date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      obj[dateStr] = true;
      return obj;
    }, {});

    const dbref = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/holidayList`
    );

    const dbref2 = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/isholiday`
    );

    const dbref3 = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/holidayPay`
    );

    try {
      await set(dbref, holidayList);
      await set(dbref2, isholiday);
      await set(dbref3, parseFloat(holidayPay));
      setSelectedHolidays(updatedHolidays);
      toast.success("공휴일 정보가 성공적으로 저장되었습니다.");
    } catch (error) {
      toast.error("공휴일 정보 저장에 실패했습니다: ", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full gap-5" data-tour="step-25">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 h-full">
        <div
          className="flex flex-col gap-7"
          style={{
            borderRight: !darkMode
              ? "1px solid #00000033"
              : "1px solid #FFFFFF33",
          }}>
          <div className="font-black">공휴일 설정 및 수정</div>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: darkMode ? "white" : "black",
                }}
                checked={isholiday}
                onChange={(event) => setIsHoliday(event.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="공휴일(주말) 구분 하기"
          />
          {isholiday && (
            <>
              <div>
                <div className="text-xs mb-3">
                  주말(토,일) 과 국가 지정 공휴일에 <br />
                  적용되는 시급 배율을 입력해주세요. <br />
                  (회사에서 지정하는 공휴일은 가입후 설정에서 가능합니다.)
                </div>
                <Input
                  type="number"
                  inputProps={{ min: 1 }}
                  value={holidayPay}
                  sx={{ color: !darkMode ? "black" : "white" }}
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
        {isholiday && (
          <div className="flex flex-col gap-7 h-full overflow-y-auto">
            <div className="font-extrabold">공휴일 날짜 추가 및 삭제</div>
            <div className="flex justify-center" data-tour="step-26">
              <DatePicker
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                minDate={new Date("2000-01-01")}
                onSelect={handleDateSelect}
                inline
                highlightDates={updatedHolidays.map((date) => ({
                  "react-datepicker__day--highlighted-custom-1": [date],
                }))}
                dayClassName={(date) =>
                  updatedHolidays.find((d) => d.getTime() === date.getTime())
                    ? "red"
                    : undefined
                }
              />
              <div>
                <HelpIcon onClick={handlePopoverClick} style={{ padding: 3 }} />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}>
                  <Typography sx={{ p: 2 }}>
                    회사 공휴일로 설정할 날짜를 찾아 더블 클릭을 하면 추가하실
                    수 있습니다.
                  </Typography>
                </Popover>
              </div>
            </div>
            {/* 공휴일리스트 */}
            <ul className="overflow-y-auto lg:h-80" data-tour="step-27">
              {updatedHolidays.map((date, index) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const dateStr = `${year}.${month}.${day}`;

                return (
                  <li key={index}>
                    <div
                      className="flex justify-between items-center gap-3 p-3 mb-5"
                      style={{
                        borderBottom: !darkMode
                          ? "1px solid #00000033"
                          : "1px solid #FFFFFF33",
                      }}>
                      {dateStr}
                      <CloseIcon
                        className="cursor-pointer"
                        onClick={() => handleDateRemove(date)}
                      />

                      {/* 삭제 버튼 */}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center" data-tour="step-28">
        <Button onClick={handleSaveChanges}>변경 사항 저장</Button>
      </div>
    </div>
  );
};

export default MyDatePicker;
