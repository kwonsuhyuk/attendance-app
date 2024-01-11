import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../firebase/index.js';

const Calendar = () => {
  const [selectedHolidays, setSelectedHolidays] = useState([]);

  const handleDateChange = (date) => {
    setSelectedHolidays((prevHolidays) => [...prevHolidays, date]);

    db.collection('holidays')
      .doc(date.toString())
      .set({
        date: date,
        isHoliday: true,
      })
      .then(() => {
        console.log('공휴일 정보가 성공적으로 저장되었습니다.');
      })
      .catch((error) => {
        console.error('공휴일 정보 저장에 실패했습니다: ', error);
      });
  };

  return (
    <DatePicker
      dateFormat='yyyy.MM.dd'
      shouldCloseOnSelect
      minDate={new Date('2000-01-01')}
      maxDate={new Date()}
      onChange={handleDateChange}
      inline
    />
  );
};

export default Calendar;
