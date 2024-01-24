import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db, getDatabase, ref, update } from '../../firebase/index.js';

function QrScan() {
  const [scanResult, setScanResult] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  const companyCode = 'yourCompanyCode'; // 회사 코드
  const userId = 'yourUserId'; // 유저 아이디

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 1,
    });

    scanner.render(
      (result) => {
        scanner.clear();
        setScanResult(result);
        const dateStr = new Date().toISOString().substring(0, 10);
        const dbref = ref(getDatabase(), `/${companyCode}/users/${userId}`);

        dbref
          .once('value')
          .then((snapshot) => {
            const updates = {};
            if (snapshot.exists() && snapshot.val().startTime) {
              updates['endTime'] = dateStr + 'T' + result + ':00Z';
              setScanMessage('퇴근 인증이 완료되었습니다');
            } else {
              updates['startTime'] = dateStr + 'T' + result + ':00Z';
              setScanMessage('출근 인증이 완료되었습니다');
            }
            update(dbref, updates);
          })
          .catch((error) => {
            console.error('인증 정보 업데이트에 실패했습니다: ', error);
          });
      },
      (err) => console.warn(err)
    );
  }, [companyCode, userId]);

  return (
    <div className='App'>
      <h1>Qr 코드를 스캔하세요</h1>
      {scanMessage ? <div>{scanMessage}</div> : <div id='reader'></div>}
    </div>
  );
}

export default QrScan;
