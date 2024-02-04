import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../firebase/index.js';
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
} from 'firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyDatePicker = () => {
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드

  useEffect(() => {
    const dbref = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/holidayList`
    );
    onValue(dbref, (snapshot) => {
      if (snapshot.exists()) {
        let holidays = snapshot.val();
        let dates = Object.keys(holidays).map((dateStr) => new Date(dateStr));
        setSelectedHolidays(dates);
      } else {
        setSelectedHolidays([]);
      }
    });
  }, []);

  const handleDateSelect = (date, event) => {
    if (event.detail === 2) {
      // 더블 클릭 이벤트 확인
      handleDateChange(date);
    }
  };

  const handleDateChange = async (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const dbref = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/holidayList/${dateStr}`
    );

    // 이미 선택된 공휴일인지 확인
    const isAlreadySelected = selectedHolidays.some(
      (d) => d.getTime() === date.getTime()
    );

    if (isAlreadySelected) {
      // 이미 선택된 공휴일이면 삭제
      try {
        await remove(dbref);
        setSelectedHolidays((prevHolidays) =>
          prevHolidays.filter((d) => d.getTime() !== date.getTime())
        );
        toast.success('공휴일 정보가 성공적으로 삭제되었습니다.');
      } catch (error) {
        toast.error('공휴일 정보 삭제에 실패했습니다: ', error);
      }
    } else {
      // 새로운 공휴일이면 추가
      try {
        await set(dbref, true);
        setSelectedHolidays((prevHolidays) => [...prevHolidays, date]);
        toast.success('공휴일 정보가 성공적으로 저장되었습니다.');
      } catch (error) {
        toast.error('공휴일 정보 저장에 실패했습니다: ', error);
      }
    }
  };

  return (
    <div>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        minDate={new Date('2000-01-01')}
        onSelect={handleDateSelect}
        inline
        highlightDates={selectedHolidays.map((date) => ({
          'react-datepicker__day--highlighted-custom-1': [date],
        }))}
        dayClassName={(date) =>
          selectedHolidays.find((d) => d.getTime() === date.getTime())
            ? 'red'
            : undefined
        }
      />
    </div>
  );
};

export default MyDatePicker;
