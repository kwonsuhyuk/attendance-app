import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment.js";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./MyCalendar.css";
import CloseIcon from "@mui/icons-material/Close";
import convertTime from "../../util/formatTime";
import { toast } from "react-toastify";
import { fetchWorkTimes } from "../../api";
import { useUserStore } from "@/store/user.store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "50vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);

  const [datesList, setDatesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadWorkTimes = async () => {
      if (!companyCode || !userId) return;

      setIsLoading(true);
      try {
        const result = await fetchWorkTimes(companyCode, userId);

        if (result.success) {
          setWorkTimes(result.workTimes);
          setDatesList(result.datesList);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("근무 시간 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkTimes();
  }, [companyCode, userId]);

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const dateStr = tileDate.toLocaleDateString("fr-CA");

      const workHours = workTimes[dateStr];
      if (workHours) {
        if (workHours == "외근") {
          return "bg-blue-300";
        }
        if (workHours >= 8) {
          return "bg-green-300";
        } else if (workHours >= 4) {
          return "bg-yellow-300";
        } else {
          return "bg-red-300";
        }
      }
    }
  };

  const onClickDay = value => {
    const dateStr = value.toLocaleDateString("fr-CA");

    if (datesList[dateStr]?.startTime) {
      const workHours = workTimes[dateStr];

      if (workHours == "외근") {
        setModalContent(
          <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full text-white-text">
              <div className="text-2xl font-bold">{dateStr}</div>
            </div>
            <div className="w-full h-[2px] bg-black"></div>
            <div>외근입니다.</div>
          </div>,
        );
      } else {
        setModalContent(
          <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full text-white-text">
              <div className="text-2xl font-bold">{dateStr}</div>
            </div>
            <div className="w-full h-[2px] bg-black"></div>
            <div className="flex flex-row w-full justify-between text-white-text">
              <div>출근 시간</div>{" "}
              <div>
                {new Date(datesList[dateStr].startTime).getHours()}시{" "}
                {new Date(datesList[dateStr].startTime).getMinutes()}분{" "}
                {new Date(datesList[dateStr].startTime).getSeconds()}초
              </div>
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="flex flex-row w-full justify-between text-white-text">
              <div>퇴근 시간</div>{" "}
              <div>
                {datesList[dateStr].endTime && (
                  <>
                    {new Date(datesList[dateStr].endTime).getHours()}시{" "}
                    {new Date(datesList[dateStr].endTime).getMinutes()}분{" "}
                    {new Date(datesList[dateStr].endTime).getSeconds()}초
                  </>
                )}
              </div>
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="flex flex-row w-full justify-between text-white-text">
              <div>일한 시간</div> <div>{convertTime(workTimes[dateStr] && workHours)}</div>
            </div>
            <div className="text-xs text-gray-500">
              (9시간 이상 근무시 점심시간 1시간 제외하고 계산.)
            </div>
          </div>,
        );
      }
    } else {
      setModalContent(
        <div className="flex flex-col gap-3">
          <div className="flex flex-row w-full text-white-text">
            <div className="text-2xl font-bold">{dateStr}</div>
          </div>
          <div className="w-full h-[2px] bg-black"></div>
          <div>근무기록이 없습니다.</div>
        </div>,
      );
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = date => {
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
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div className="absolute top-3 right-3">
            <CloseIcon onClick={() => setOpen(false)} />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex justify-center items-center text-white-text font-bold"
          >
            상세기록
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, p: 3, border: "1px solid black" }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default MyCalendar;
