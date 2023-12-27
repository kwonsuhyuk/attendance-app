//import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { attendanceState } from './attendanceState';
import QrReader from 'react-qr-reader';
import { db } from './firebase/index.js';

function QrScan() {
  const [attendance, setAttendance] = useRecoilState(attendanceState)

  const handleScan = (data) => {
    if (data) {
      const now = new Date();
      const userId = 'user1';
      db.collection('users')
        .doc(userId)
        .collection('attendance')
        .doc(data)
        .set({
          attendance: '출석',
          time: now,
        })
        .then(() => {
          setAttendance('출석 완료');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{attendance}</p>
    </div>
  );
}

export default QrScan;
