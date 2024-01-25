import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { useSelector } from 'react-redux';

function QrScan() {
  const [scanResult, setScanResult] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser.photoURL; // 회사 코드
  const userId = currentUser.uid; // 유저 아이디

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render((result) => {
      scanner.clear();
      setScanResult(result);
      const dateStr = new Date().toString();
      const db = getDatabase();
      const dbref = ref(db, `companyCode/${companyCode}/users/${userId}`);
      onValue(dbref, (snapshot) => {
        if (snapshot.exists() && snapshot.val().startTime) {
          update(ref(db, `companyCode/${companyCode}/users/${userId}`), {
            endTime: dateStr,
          });
          setScanMessage('퇴근 인증이 완료되었습니다');
          console.log(scanMessage);
        } else {
          set(ref(db, `companyCode/${companyCode}/users/${userId}`), {
            startTime: dateStr,
          });
          setScanMessage('출근 인증이 완료되었습니다');
          console.log(scanMessage);
        }
      });
    });
  }, [companyCode, userId]);
  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner('reader', {
  //     qrbox: { width: 250, height: 250 },
  //     fps: 1,
  //   });

  //   scanner.render((result) => {
  //     scanner.clear();
  //     setScanResult(result);
  //     const dateStr = new Date().toString();
  //     const db = getDatabase();
  //     const dbref = ref(db, `companyCode/${companyCode}/users/${userId}`);
  //     get(dbref).then((snapshot) => {
  //       if (
  //         snapshot.exists() &&
  //         snapshot.val().startTime &&
  //         !snapshot.val().endTime
  //       ) {
  //         update(ref(db, `companyCode/${companyCode}/users/${userId}`), {
  //           endTime: dateStr,
  //         });
  //         setScanMessage('퇴근 인증이 완료되었습니다');
  //       } else if (!snapshot.exists() || !snapshot.val().startTime) {
  //         set(ref(db, `companyCode/${companyCode}/users/${userId}`), {
  //           startTime: dateStr,
  //         });
  //         setScanMessage('출근 인증이 완료되었습니다');
  //       }
  //     });
  //   });
  // }, [companyCode, userId]);

  return (
    <div className='App'>
      <h1>Qr 코드를 스캔하세요</h1>
      {scanMessage ? <div>{scanMessage}</div> : <div id='reader'></div>}
    </div>
  );
}

export default QrScan;
