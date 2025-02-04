import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";

const QrGenerator = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const { currentCompany } = useSelector(state => state.company);
  const qrValue = currentCompany?.qrValue || "";

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas") as HTMLCanvasElement | null;
      if (canvas) {
        setQrUrl(canvas.toDataURL("image/png"));
      }
    }
  }, []);

  return (
    <div ref={qrRef}>
      {/* QRCode의 value 값이 없을 경우 대비 */}
      <QRCode value={qrValue} />
      <div className="flex justify-center items-center bg-gray-500 p-2 rounded-full">
        <a href={qrUrl} download="QRCode.png" className="text-white">
          QR 다운로드
        </a>
      </div>
    </div>
  );
};

export default QrGenerator;
