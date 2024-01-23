import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../firebase/index.js';
import { child, getDatabase, push, ref, set, update } from 'firebase/database';
import { useSelector } from 'react-redux';

const MyDatePicker = () => {
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드

  const handleDateChange = (date) => {
    setSelectedHolidays((prevHolidays) => {
      const newHolidays = [...prevHolidays, date];
      const updates = {};
      newHolidays.forEach((date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        updates[dateStr] = true;
      });

      const dbref = ref(
        getDatabase(),
        `companyCode/${companyCode}/companyInfo/holidayList`
      );

      update(dbref, updates)
        .then(() => {
          console.log('공휴일 정보가 성공적으로 저장되었습니다.');
          console.log(newHolidays);
        })
        .catch((error) => {
          console.error('공휴일 정보 저장에 실패했습니다: ', error);
        });

      return newHolidays;
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

export default MyDatePicker;
