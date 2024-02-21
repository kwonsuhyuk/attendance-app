import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { getDatabase, get, ref, set, update, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function QrScan({ companyLogo }) {
  const [scanResult, setScanResult] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser.photoURL; // 회사 코드
  const userId = currentUser.uid; // 유저 아이디
  const [currentCompany, setCurrentCompany] = useState();
  const [jobName, setJobName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });
    async function getCompanyInfo() {
      const db = getDatabase();
      const dbRef = ref(db, `companyCode/${currentUser?.photoURL}/companyInfo`);
      const jobNameRef = ref(
        db,
        `companyCode/${currentUser?.photoURL}/users/${currentUser?.uid}/jobName`
      );
      const snapshot = await get(dbRef);
      const jobSnapshot = await get(jobNameRef);
      if (snapshot.val() && jobSnapshot.val()) {
        setCurrentCompany(snapshot.val());
        setJobName(jobSnapshot.val());
      }
    }

    scanner.render(async (result) => {
      scanner.clear();
      setScanResult(result);
      const dateStr = new Date().toString();
      const db = getDatabase();

      // 스캔할 때마다 날짜를 확인
      const now = new Date();
      const nowStr = now.toISOString().slice(0, 10);
      const tomorrowForNow = new Date(now);
      tomorrowForNow.setDate(tomorrowForNow.getDate() + 1);
      const tomorrowForNowStr = tomorrowForNow.toISOString().slice(0, 10);
      let workHours = 0;

      const dbref = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/date/${nowStr}`
      );
      const workDateRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/workDates/${nowStr}`
      );

      const snapshot = await get(dbref);
      if (snapshot.exists() && snapshot.val().startTime) {
        const nextDayRef = ref(
          db,
          `companyCode/${companyCode}/users/${userId}/date/${tomorrowForNowStr}`
        );
        const nextDaySnapshot = await get(nextDayRef);
        if (nextDaySnapshot.exists() && nextDaySnapshot.val().startTime) {
          await update(nextDayRef, { endTime: dateStr });
          setScanMessage('다음 날 퇴근 인증이 완료되었습니다');
          toast.success('다음 날 퇴근 인증이 완료되었습니다');
        } else {
          await update(dbref, { endTime: dateStr });
          setScanMessage('퇴근 인증이 완료되었습니다');
          toast.success('퇴근 인증이 완료되었습니다');
        }
      } else {
        await set(dbref, { startTime: dateStr });
        await set(workDateRef, {
          workHour: workHours,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });
        setScanMessage('출근 인증이 완료되었습니다');
        toast.success('출근 인증이 완료되었습니다');
      }
      navigate(`/${currentUser.photoURL}/companymain`);
    });
    getCompanyInfo();
    return () => {
      setCurrentCompany([]);
    };
  }, [companyCode, userId]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={companyLogo}
          alt="회사로고"
          className="rounded-full w-[130px] h-[130px]"
          style={{ border: '2px solid black' }}
        />
        <div className="flex items-center text-white-text">
          {currentCompany?.companyName}/{jobName}
        </div>
      </div>
      <div className="h-full w-full">
        {/* <h1>Qr 코드를 스캔하세요</h1> */}
        <div id="reader"></div>
      </div>
    </div>
  );
}

export default QrScan;
