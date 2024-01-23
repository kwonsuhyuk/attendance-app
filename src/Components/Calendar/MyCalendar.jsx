import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment.js';
import { db } from '../../firebase/index.js';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드

  useEffect(() => {
    const db = getDatabase();
    const dbref = ref(db, `companyCode/${companyCode}/users`);
    onValue(dbref, (snapshot) => {
      const times = {};
      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        if (userData.starttime && userData.endtime) {
          const startDateStr = userData.startTime.substring(0, 10);
          const endDateStr = userData.endTime.substring(0, 10);

          if (!times[startDateStr]) {
            times[startDateStr] = {
              start: userData.startTime,
              end: userData.endTime,
            };
          } else {
            if (userData.starttime < times[startDateStr].start) {
              times[startDateStr].start = userData.starttime;
            }
            if (userData.endtime > times[startDateStr].end) {
              times[startDateStr].end = userData.endtime;
            }
          }
        }
      });
      setWorkTimes(times);
    });
  }, [companyCode]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().substring(0, 10);
      const workTime = workTimes[dateStr];
      if (workTime) {
        const diffHours =
          (new Date(workTime.end) - new Date(workTime.start)) / 1000 / 60 / 60;
        if (diffHours >= 8) {
          return 'bg-green-500';
        } else if (diffHours >= 4) {
          return 'bg-yellow-500';
        } else {
          return 'bg-red-500';
        }
      }
    }
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className='flex justify-center items-center'>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        formatDay={(locale, date) => moment(date).format('DD')}
      />
    </div>
  );
}

export default MyCalendar;
