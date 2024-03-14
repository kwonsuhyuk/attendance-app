// QrGenerator.js
import React, { useEffect, useRef } from "react";
import QRCode from "qrcode.react";

function QrGenerator({ setQR }) {
  const qrRef = useRef(null);
  const [qrUrl, setQrUrl] = React.useState("");

  // 랜덤한 문자열을 생성합니다.
  const randomValue =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      setQrUrl(canvas.toDataURL("image/png"));
      setQR(randomValue);
    }
  }, [setQR, randomValue]);

  return (
    <div ref={qrRef}>
      {/* 랜덤으로 생성된 문자열을 QRCode의 value로 설정합니다. */}
      <QRCode value={randomValue} />
      <div
        className="flex justify-center items-center bg-gray-500 p-2"
        style={{ borderRadius: "20px" }}>
        <a href={qrUrl} download="QRCode.png" className="text-white">
          QR 다운로드
        </a>
      </div>
    </div>
  );
}

export default QrGenerator;
