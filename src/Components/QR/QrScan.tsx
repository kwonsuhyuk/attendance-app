import { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { fetchCompanyAndJobInfo, processQRScan, registerOutWork } from "../../api";

interface QrScanProps {
  companyLogo: string;
}

function QrScan({ companyLogo }: QrScanProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.user);
  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디
  // 회사 타입 지정후 재지정 필요
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const [jobName, setJobName] = useState<string | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadCompanyInfo = async () => {
      if (companyCode && userId) {
        const result = await fetchCompanyAndJobInfo(companyCode, userId);
        if (result.success && result.data) {
          setCurrentCompany(result?.data.companyInfo);
          setJobName(result.data.jobName);
        } else {
          toast.error("회사 정보를 불러오는데 실패했습니다.");
        }
      }
    };

    loadCompanyInfo();

    return () => setCurrentCompany(null);
  }, [companyCode, userId]);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      async result => {
        if (companyCode && userId) {
          qrScanner.stop();
          if (result.data === companyCode) {
            const scanResult = await processQRScan(companyCode, userId, new Date().toString());
            if (scanResult.success && scanResult.message) {
              setScanMessage(scanResult.message);
              toast.success(scanResult.message);
              navigate(`/${companyCode}/companymain`);
            } else {
              toast.error(scanResult.error);
              qrScanner.start(); // 에러 발생 시 다시 스캔 시작
            }
          } else {
            toast.error("유효하지 않은 QR 코드입니다.");
            qrScanner.start(); // 스캔 재시작
          }
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        onDecodeError: error => {},
      },
    );

    qrScanner.start().catch((error: Error) => {
      console.error("Failed to start QR scanner:", error);
      toast.error("QR 스캐너를 시작하는데 실패했습니다.");
    });

    return () => {
      qrScanner.destroy();
    };
  }, [companyCode, userId]);

  const handleCheckOutJob = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitOutJob = async () => {
    if (companyCode && userId) {
      const result = await registerOutWork(companyCode, userId);

      if (result.success) {
        handleClose();
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10" data-tour="step-35">
        <div className="flex flex-col items-center gap-4">
          <img src={companyLogo || "/placeholder.svg"} alt="회사로고" className="rounded-full w-[130px] h-[130px]" />
          <div className="font-black">{currentCompany?.companyName}</div>
          <div className="flex items-center">
            {currentUser?.displayName}/{jobName}
          </div>
        </div>

        <div className="h-full w-full" data-tour="step-36">
          <video ref={videoRef} className="w-full h-[250px] object-cover" />
        </div>

        <div
          data-tour="step-38"
          className="underline text-sm text-red-500 text-center mb-3"
          onClick={handleCheckOutJob}>
          외근 시 여기를 클릭해주세요.
        </div>
        <div data-tour="step-37" className="absolute right-0 bottom-0 w-52 h-10"></div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>{"정말 외근으로 출근 하시는게 맞습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            금일 {`${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}을 외근으로
            출근 시 회사 출퇴근 시간이 기록되지 않습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-red-500">
            취소
          </Button>
          <Button onClick={submitOutJob}>출근</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QrScan;
