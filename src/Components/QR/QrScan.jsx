import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { Html5QrcodeScanner } from 'html5-qrcode';

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
  }, []);

  return (
    <div className='App'>
      <h1>Qr code scanning in react</h1>
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

export default QrScan;
