import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { useCompanyStore } from "@/store/company.store";
import { Download } from "lucide-react";

const QrGenerator = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const qrValue = useCompanyStore(state => state.currentCompany?.qrValue) || "";

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas") as HTMLCanvasElement | null;
      if (canvas) {
        setQrUrl(canvas.toDataURL("image/png"));
      }
    }
  }, []);

  //  QR 코드 다운로드 함수
  const handleDownload = () => {
    if (qrUrl) {
      const link = document.createElement("a");
      link.href = qrUrl;
      link.download = "QRCode.png"; // 다운로드 파일명 지정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div ref={qrRef} className="relative flex flex-col items-center">
      {/*  QR 코드 */}
      <QRCode value={qrValue} className="p-2 bg-white rounded-lg shadow-md" />

      {/*  다운로드 버튼 (QR 코드 위에 표시) */}
      {qrUrl && (
        <div
          onClick={handleDownload}
          className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          role="button"
          aria-label="QR 코드 다운로드"
        >
          <Download className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
  );
};

export default QrGenerator;
