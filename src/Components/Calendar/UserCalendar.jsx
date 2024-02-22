import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment.js";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import "./UserCalendar.css";

function UserCalendar({ user }) {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드
  const [selectedDate, setSelectedDate] = useState(moment(selectedDate));

  useEffect(() => {
    const db = getDatabase();
    const dateRef = ref(
      db,
      `companyCode/${companyCode}/users/${user.uid}/date`
    );

    Promise.all([get(dateRef)]).then(([dateSnapshot]) => {
      if (dateSnapshot.exists()) {
        const dates = dateSnapshot.val();
        let newWorkTimes = {};
        for (let date in dates) {
          const { startTime, endTime } = dates[date];
          const start = new Date(startTime);
          const end = new Date(endTime);
          const workHours = Math.floor(Math.abs(end - start) / 36e5); //근무시간 계산 (시간)
          const workMinutes = Math.round(
            (Math.abs(end - start) % 36e5) / 60000
          ); //근무시간 계산 (분, 초단위 올림)
          newWorkTimes[date] = { workHours, workMinutes, startTime, endTime };
        }
        setWorkTimes(newWorkTimes);
      }
    });
  }, [companyCode, user.uid, workTimes]);

  const tileContent = ({ date, view }) => {
    // Month view에 대해서만 커스텀 컨텐트를 제공합니다.
    if (view === "month") {
      const workTime = workTimes[moment(date).format("YYYY-MM-DD")];

      // If workTime exists for the date
      if (workTime) {
        const { workHours, workMinutes } = workTime;
        // 각 날짜에 대한 근무 시간, 시작 시간, 종료 시간을 반환합니다.
        return (
          <div className="text-xl px-5 py-10 h-full flex items-center justify-center">
            <span
              className="bg-green-300 text-black text-xs w-full"
              style={{ borderRadius: "10px" }}>
              {workHours}시간 {workMinutes}분
            </span>
          </div>
        );
      } else {
        // If workTime does not exist for the date
        return (
          <p className="text-xl px-5 py-10 h-full flex items-center justify-center"></p>
        );
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    // Month view에 대해서만 클래스를 추가합니다.
    if (view === "month") {
      // 'border' 클래스를 추가합니다.
      return "border";
    }
  };

  const onClickDay = (value, event) => {
    // if (!selectedDate || (selectedDate && +selectedDate === +value)) {
    //   setCalendarWidth((prevWidth) =>
    //     prevWidth === "w-2/3" ? "w-full" : "w-2/3"
    //   );
    //   setShowText((prevShowText) => !prevShowText);
    // } else {
    //   setShowText(true);
    // }
    // setSelectedDate(value);
  };

  // const tileClassName = ({ date: tileDate, view }) => {
  //   if (view === 'month') {
  //     const dateStr = tileDate.toLocaleDateString('fr-CA');
  //     const workHours = workTimes[dateStr];
  //     if (workHours) {
  //       if (workHours >= 8) {
  //         return 'bg-green-500';
  //       } else if (workHours >= 4) {
  //         return 'bg-yellow-500';
  //       } else {
  //         return 'bg-red-500';
  //       }
  //     }
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="h-full w-full">
      <div className="h-30 mb-5">
        <div>이름 : {user.name}</div>
        <div>직책 : {user.jobName}</div>
      </div>
      <div className="bg-orange-500 h-5/6 flex">
        <Calendar
          locale="en-US"
          onChange={onChange}
          value={date}
          tileClassName={tileClassName}
          onClickDay={onClickDay}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={tileContent}
          className={`h-full transition-all duration-500 ease-in-out`}
        />
        {/* {showText && <div>{moment(selectedDate).format("YYYY-MM-DD")}</div>} */}
      </div>
    </div>
  );
}

export default UserCalendar;
