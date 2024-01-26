import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { getDatabase, onValue, ref, set, update, get } from 'firebase/database';
import { useSelector } from 'react-redux';

function QrScan() {
  const [scanResult, setScanResult] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  const [isStartTimeSet, setIsStartTimeSet] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser.photoURL; // 회사 코드
  const userId = currentUser.uid; // 유저 아이디
  const today = new Date().toISOString().slice(0, 10); // 오늘 날짜

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render(async (result) => {
      scanner.clear();
      setScanResult(result);
      const dateStr = new Date().toString();
      const db = getDatabase();
      const dbref = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/${today}`
      );

      onValue(dbref, async (snapshot) => {
        if (snapshot.exists() && snapshot.val().startTime && !isStartTimeSet) {
          await update(
            ref(db, `companyCode/${companyCode}/users/${userId}/${today}`),
            {
              endTime: dateStr,
            }
          );
          setScanMessage('퇴근 인증이 완료되었습니다');
          console.log(scanMessage);
        } else if (!snapshot.exists() || !snapshot.val().startTime) {
          await set(
            ref(db, `companyCode/${companyCode}/users/${userId}/${today}`),
            {
              startTime: dateStr,
            }
          );
          setIsStartTimeSet(true);
          setScanMessage('출근 인증이 완료되었습니다');
          console.log(scanMessage);
          console.log(today);
        }
      });
    });
  }, [isStartTimeSet]);

  return (
    <div className='App'>
      <h1>Qr 코드를 스캔하세요</h1>
      {scanMessage ? <div>{scanMessage}</div> : <div id='reader'></div>}
    </div>
  );
}

export default QrScan;
