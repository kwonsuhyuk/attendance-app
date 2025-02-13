import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchCompanyAndJobInfo, processQRScan, registerOutWork } from "../../api";
import { decrypt } from "@/util/encryptDecrypt";
import { QRSCAN_PERIOD } from "@/constant/qr";
import QrScanner from "qr-scanner";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { useCompanyStore } from "@/store/company.store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QrScan = () => {
  const { companyCode, userId, name } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      name: state.currentUser?.name,
    })),
  );
  const companyLogo = useCompanyStore(state => state.currentCompany?.companyLogo);
  const companyName = useCompanyStore(state => state.currentCompany?.companyName);
  const [jobName, setJobName] = useState<string | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastErrorTime = useRef<number>(0);
  const today = `${new Date().getFullYear()}년 ${
    new Date().getMonth() + 1
  }월 ${new Date().getDate()}일`;
  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      async result => {
        if (companyCode && userId) {
          if (decrypt(result.data) === companyCode) {
            qrScanner.stop();
            const scanResult = await processQRScan(companyCode, userId, new Date().toString());

            if (scanResult.success && scanResult.message) {
              toast.success(scanResult.message);
              navigate(`/${companyCode}/companymain`);
            } else {
              toast.error(scanResult.error);
              qrScanner.start();
            }
          } else {
            const currentTime = Date.now();
            if (currentTime - lastErrorTime.current > QRSCAN_PERIOD) {
              toast.error("유효하지 않은 QR 코드입니다.");
              lastErrorTime.current = currentTime;
            }
          }
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    );

    qrScanner.start().catch(error => {
      console.error("Failed to start QR scanner:", error);
      toast.error("QR 스캐너를 시작하는데 실패했습니다.");
    });

    return () => {
      qrScanner.destroy();
    };
  }, [companyCode, userId, navigate]);

  const submitOutJob = async () => {
    if (companyCode && userId) {
      const result = await registerOutWork(companyCode, userId);
      if (result.success) {
        setOpen(false);
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
          <img
            src={companyLogo || "/placeholder.svg"}
            alt="회사로고"
            className="rounded-full w-[130px] h-[130px]"
          />
          <div className="font-black">{companyName}</div>
          <div className="flex items-center">
            {name}/{jobName}
          </div>
        </div>

        <div className="h-full w-full" data-tour="step-36">
          <video ref={videoRef} className="w-full h-[250px] object-cover" />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div
              data-tour="step-38"
              className="underline text-sm text-red-500 text-center mb-3 cursor-pointer"
            >
              외근 시 여기를 클릭해주세요.
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 외근으로 출근 하시는게 맞습니까?</DialogTitle>
              <DialogDescription>
                금일 {today}을 외근으로 출근 시 회사 출퇴근 시간이 기록되지 않습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={submitOutJob}>출근</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default QrScan;
