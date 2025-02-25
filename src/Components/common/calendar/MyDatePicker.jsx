import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./MyDatePicker.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import { Checkbox, FormControlLabel, Input } from "@mui/material";
import { Button } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { useTour } from "@reactour/tour";
import { fetchHolidaySettings, fetchHolidayList, saveHolidaySettings } from "@/api";
import { useUserStore } from "@/store/user.store";
import { MY_DATE_PICKER_STPES } from "@/constants/tourStep";
import Loading from "../Loading";

const MyDatePicker = () => {
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isholiday, setIsHoliday] = useState();
  const [holidayPay, setHolidayPay] = useState(0);
  const { darkMode } = useSelector(state => state.darkmodeSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedHolidays, setUpdatedHolidays] = useState(selectedHolidays);
  const { isOpen, setCurrentStep, setSteps } = useTour();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(6);
        setSteps(prev => [...prev, MY_DATE_PICKER_STPES]);
      }, 300);

      return () => {
        clearTimeout(timer);
        setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps]);

  // 공휴일 설정 데이터 불러오기
  useEffect(() => {
    const loadHolidaySettings = async () => {
      if (!companyCode) return;

      setIsLoading(true);
      const result = await fetchHolidaySettings(companyCode);
      if (result.success) {
        setIsHoliday(result.data.isHoliday);
        setHolidayPay(result.data.holidayPay);
      } else {
        toast.error("공휴일 설정을 불러오는데 실패했습니다.");
      }

      setIsLoading(false);
    };

    loadHolidaySettings();
  }, [companyCode]);

  // 공휴일 목록 불러오기
  useEffect(() => {
    const loadHolidayList = async () => {
      if (!companyCode) return;

      const result = await fetchHolidayList(companyCode);
      if (result.success) {
        setSelectedHolidays(result.dates);
        setUpdatedHolidays(result.dates);
      } else {
        toast.error("공휴일 목록을 불러오는데 실패했습니다.");
      }
    };

    loadHolidayList();
  }, [companyCode]);

  const handlePopoverClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleDateSelect = (date, event) => {
    if (event.detail === 2) {
      handleDateAdd(date);
    }
  };

  const handleDateAdd = date => {
    const isAlreadySelected = updatedHolidays.some(d => d.getTime() === date.getTime());

    if (!isAlreadySelected) {
      // 새로운 공휴일이면 추가

      setUpdatedHolidays(prevHolidays => [...prevHolidays, date]);
    }
  };

  const handleDateRemove = dateToRemove => {
    setUpdatedHolidays(prevHolidays =>
      prevHolidays.filter(date => date.getTime() !== dateToRemove.getTime()),
    );
  };

  const handleSaveChanges = async () => {
    const result = await saveHolidaySettings(companyCode, {
      holidays: updatedHolidays,
      isHoliday: isholiday,
      holidayPay: holidayPay,
    });

    if (result.success) {
      setSelectedHolidays(updatedHolidays);
      toast.success("공휴일 정보가 성공적으로 저장되었습니다.");
    } else {
      toast.error("공휴일 정보 저장에 실패했습니다.");
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
            borderRight: !darkMode ? "1px solid #00000033" : "1px solid #FFFFFF33",
          }}
        >
          <div className="font-black">공휴일 설정 및 수정</div>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: darkMode ? "white" : "black",
                }}
                checked={isholiday}
                onChange={event => setIsHoliday(event.target.checked)}
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
                  onChange={e => setHolidayPay(e.target.value)}
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
                highlightDates={updatedHolidays.map(date => ({
                  "react-datepicker__day--highlighted-custom-1": [date],
                }))}
                dayClassName={date =>
                  updatedHolidays.find(d => d.getTime() === date.getTime()) ? "red" : undefined
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
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    회사 공휴일로 설정할 날짜를 찾아 더블 클릭을 하면 추가하실 수 있습니다.
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
                        borderBottom: !darkMode ? "1px solid #00000033" : "1px solid #FFFFFF33",
                      }}
                    >
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
