import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment.js';
import { get, getDatabase, ref, update, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './MyCalendar.css';
import { ClipLoader } from 'react-spinners';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function getNextDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}
function getPrevDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드
  const userId = currentUser?.uid;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchWorkTimes = async () => {
      setIsLoading(true);
      const db = getDatabase();
      const dateRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/date`
      );
      const snapshot = await get(dateRef);

      if (snapshot.exists()) {
        const dates = snapshot.val();
        let newWorkTimes = {};

        for (let date in dates) {
          const { startTime, endTime } = dates[date];
          let start, end, workDate;

          if (startTime) {
            start = new Date(startTime);
            workDate = start.toISOString().split('T')[0];
            //console.log(start);
          } else {
            const prevDay = getPrevDate(date);
            const prevDayRef = ref(
              db,
              `companyCode/${companyCode}/users/${userId}/date/${prevDay}`
            );
            const prevDaySnapShot = await get(prevDayRef);
            if (prevDaySnapShot.exists() && prevDaySnapShot.val().startTime) {
              start = new Date(prevDaySnapShot.val().startTime);
              //console.log(start);
            } else {
              console.warn(`${date}의 시작 시간이 없습니다.`);
            }
            setIsLoading(true);
          }

          if (endTime) {
            end = new Date(endTime);
            //console.log(end);
          } else {
            const nextDay = getNextDate(date);
            const nextDayRef = ref(
              db,
              `companyCode/${companyCode}/users/${userId}/date/${nextDay}`
            );
            const nextDaySnapshot = await get(nextDayRef);

            if (nextDaySnapshot.exists() && nextDaySnapshot.val().endTime) {
              end = new Date(nextDaySnapshot.val().endTime);
              console.log(end);
            } else {
              console.warn(
                `${date}의 퇴근 시간이 없습니다. 아직 퇴근을 하지 않았을 수 있습니다.`
              );
            }
            setIsLoading(true);
          }

          if (start && end) {
            let workHours;
            if (start < end) {
              workHours = Number((Math.abs(end - start) / 36e5).toFixed(1));
            } else {
              workHours = Number(
                (24 - start.getHours() + end.getHours()).toFixed(1)
              );
            }
            const workDateRef = ref(
              db,
              `companyCode/${companyCode}/users/${userId}/workDates/${workDate}`
            );
            const workDateSnapshot = await get(workDateRef);
            if (workDateSnapshot.exists() && workDateSnapshot.val()) {
              await update(workDateRef, { workHour: workHours });
            }
            newWorkTimes[workDate] = workHours;
            setIsLoading(false);
          }
        }
        if (isMounted) {
          setWorkTimes(newWorkTimes);
        }
      }
    };

    fetchWorkTimes();
    return () => {
      isMounted = false;
    };
  }, [companyCode, userId]);

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const dateStr = tileDate.toLocaleDateString('fr-CA');
      const workHours = workTimes[dateStr];
      if (workHours) {
        if (workHours >= 8) {
          return 'bg-green-500';
        } else if (workHours >= 4) {
          return 'bg-yellow-500';
        } else {
          return 'bg-red-500';
        }
      }
    }
  };

  const onClickDay = (value, event) => {
    const dateStr = value.toLocaleDateString('fr-CA');

    if (workTimes[dateStr]) {
      const workHours = workTimes[dateStr];
      setModalContent(
        <>
          <div className="flex flex-row w-full justify-between text-white-text">
            <div>근무 날짜 : </div>
            <div>{dateStr}</div>
          </div>
          <div className="flex flex-row w-full justify-between text-white-text">
            <div>일한 시간 : </div> <div>{workHours}</div>
          </div>
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
        formatDay={(locale, date) => moment(date).format('DD')}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex justify-center items-center text-white-text font-bold"
          >
            상세기록
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
