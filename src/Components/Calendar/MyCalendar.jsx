import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../firebase/index.js';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [workTimes, setWorkTimes] = useState({});

  useEffect(() => {
    db.collection('attendance')
      .get()
      .then((querySnapshot) => {
        const times = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.time) {
            const dateStr = data.time.toISOString().substring(0, 10);
            if (!times[dateStr]) {
              times[dateStr] = {
                start: data.time,
                end: data.time,
              };
            } else {
              if (data.time < times[dateStr].start) {
                times[dateStr].start = data.time;
              }
              if (data.time > times[dateStr].end) {
                times[dateStr].end = data.time;
              }
            }
          }
        });
        setWorkTimes(times);
      });
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().substring(0, 10);
      const workTime = workTimes[dateStr];
      if (workTime) {
        const diffHours = (workTime.end - workTime.start) / 1000 / 60 / 60;
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
      />
    </div>
  );
}

export default MyCalendar;
