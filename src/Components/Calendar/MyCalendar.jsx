import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment.js";

import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드
  const userId = currentUser?.uid;

  useEffect(() => {
    const db = getDatabase();
    const dateRef = ref(db, `companyCode/${companyCode}/users/${userId}/date`);

    Promise.all([get(dateRef)]).then(([dateSnapshot]) => {
      if (dateSnapshot.exists()) {
        const dates = dateSnapshot.val();
        // Initialize a new object to store work times
        let newWorkTimes = {};
        for (let date in dates) {
          const { startTime, endTime } = dates[date];
          const start = new Date(startTime);
          const end = new Date(endTime);
          const workHours = Math.abs(end - start) / 36e5; //근무시간 계산
          // Store work hours in the new object
          newWorkTimes[date] = workHours;
        }
        // Update state with the new object
        setWorkTimes(newWorkTimes);
      }
    });
    console.log(workTimes);
  }, [companyCode, userId, workTimes]);

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const dateStr = tileDate.toLocaleDateString("fr-CA");
      const workHours = workTimes[dateStr];
      if (workHours) {
        if (workHours >= 8) {
          return "bg-green-500";
        } else if (workHours >= 4) {
          return "bg-yellow-500";
        } else {
          return "bg-red-500";
        }
      }
    }
  };

  const onClickDay = (value, event) => {
    const dateStr = value.toLocaleDateString("fr-CA");
    const workHours = workTimes[dateStr];
    if (workHours) {
      setModalContent(
        <>
          당신이 {dateStr}에 일한 시간은{" "}
          <span style={{ color: "blue" }}>{workHours}시간</span> 입니다.
        </>
      );
    } else {
      setModalContent(`당신은 ${dateStr}에 근무하지 않았습니다.`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="flex justify-center items-center">
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Work Hours Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default MyCalendar;
