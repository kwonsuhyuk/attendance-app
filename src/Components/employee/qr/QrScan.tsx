// import { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { decrypt } from "@/util/encryptDecrypt.util";
// import { QRSCAN_FAILED, QRSCAN_NOT_VALID, QRSCAN_PERIOD } from "@/constants/qr";
// import QrScanner from "qr-scanner";
// import { useUserStore } from "@/store/user.store";
// import { useShallow } from "zustand/shallow";
// import { processQRScan } from "@/api/commute.api";

// const QrScan = () => {
//   const { companyCode, userId } = useUserStore(
//     useShallow(state => ({
//       companyCode: state.currentUser?.companyCode,
//       userId: state.currentUser?.uid,
//     })),
//   );
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const lastErrorTime = useRef<number>(0);

//   useEffect(() => {
//     if (!videoRef.current) return;

//     let qrScanner = new QrScanner(
//       videoRef.current,
//       async result => {
//         if (!result?.data) {
//           console.warn("No QR data found");
//           return;
//         }
//         if (companyCode && userId) {
//           if (decrypt(result.data) === companyCode) {
//             qrScanner.stop();
//             const scanResult = await processQRScan(companyCode, userId, new Date().toString());

//             if (scanResult.success && scanResult.message) {
//               toast.success(scanResult.message);
//               navigate(`/${companyCode}/employee/companymain`);
//             } else {
//               toast.error(scanResult.error);
//               qrScanner.start();
//             }
//           } else {
//             const currentTime = Date.now();

//             if (currentTime - lastErrorTime.current > QRSCAN_PERIOD) {
//               toast.error(QRSCAN_NOT_VALID);
//               lastErrorTime.current = currentTime;
//             }
//           }
//         }
//       },
//       {
//         highlightScanRegion: true,
//         highlightCodeOutline: true,
//         maxScansPerSecond: 2,
//       },
//     );

//     qrScanner.start().catch(error => {
//       console.error("Failed to start QR scanner:", error);
//       toast.error(QRSCAN_FAILED);
//     });

//     return () => {
//       qrScanner.destroy();
//     };
//   }, []);

//   return (
//     <div className="h-full w-full" data-tour="step-36">
//       <video ref={videoRef} className="h-[250px] w-full object-cover" />
//     </div>
//   );
// };

// export default QrScan;
