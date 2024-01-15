import React, { useState, useRef, useEffect } from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrReader } from 'react-qr-reader';

function QrScan() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function error(err) {
      console.warn(err);
    }
    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div className='App'>
      <h1>Qr 코드를 스캔하세요</h1>
      {scanResult ? (
        <div>
          Success: <a href={'http://' + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id='reader'></div>
      )}
    </div>
  );
}

// function QrScan() {
//   const [attendance, setAttendance] = useState('출석하지 않음');

//   const handleScan = (data) => {
//     if (data) {
//       const now = new Date();
//       console.log(now);
//     }

//     const handleError = (err) => {
//       console.error(err);
//     };

//     return (
//       <div>
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: 250, height: 250 }}
//         />
//         <p>{attendance}</p>
//       </div>
//     );
//   };
// }

export default QrScan;
