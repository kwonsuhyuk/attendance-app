import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { getDatabase, get, ref, set, update, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//import { snap } from 'gsap';

function QrScan({ companyLogo }) {
  const [scanResult, setScanResult] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser.photoURL; // 회사 코드
  const userId = currentUser.uid; // 유저 아이디
  const [currentCompany, setCurrentCompany] = useState();
  const [jobName, setJobName] = useState();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

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

      let date = new Date();
      const offset = date.getTimezoneOffset() * 60000;
      const now = new Date(Date.now() - offset);

      const nowStr = now.toISOString().slice(0, 10);

      const yesterdayForNow = new Date(Date.now() - offset);
      yesterdayForNow.setDate(yesterdayForNow.getDate() - 1);
      const yesterdayForNowStr = yesterdayForNow.toISOString().slice(0, 10);

      let workHours = 0;

      const dbref = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/date/${nowStr}`
      );
      const workDateRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/workDates/${nowStr}`
      );

      const prevDayRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/date/${yesterdayForNowStr}`
      );
      const prevWorkDateRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/workDates/${yesterdayForNowStr}`
      );

      const prevDaySnapshot = await get(prevDayRef);
      const snapshot = await get(dbref);

      if (prevDaySnapshot.exists() || snapshot.exists()) {
        if (
          //오늘 출근기록이 없고 어제 출근기록은 있는데 퇴근 기록은 없는 경우
          !snapshot.exists() &&
          prevDaySnapshot.exists() &&
          prevDaySnapshot.val().startTime &&
          !prevDaySnapshot.val().endTime
        ) {
          console.log('어제 출근기록 있음');
          await update(prevDayRef, { endTime: dateStr });
          setScanMessage('다음 날 퇴근 인증이 완료되었습니다');
          toast.success('다음 날 퇴근 인증이 완료되었습니다');
        } else if (
          //오늘 출근기록이 있을경우
          snapshot.exists() &&
          snapshot.val().startTime &&
          !snapshot.val().endTime
        ) {
          await update(dbref, { endTime: dateStr });
          setScanMessage('퇴근 인증이 완료되었습니다');
          toast.success('퇴근 인증이 완료되었습니다');
        } else if (
          //오늘 퇴근기록만 있고 출근기록은 없는 경우
          snapshot.exists() &&
          snapshot.val().endTime &&
          !snapshot.val().startTime
        ) {
          console.log('여기걸림');
          const startTime = prevDaySnapshot.val().startTime;
          const endTime = snapshot.val().endTime;
          const start = new Date(startTime);
          const end = new Date(endTime);
          workHours = Number(
            (24 - start.getHours() + end.getHours()).toFixed(1)
          );
          await set(dbref, { startTime: dateStr });
          await update(prevDayRef, { endTime: endTime });
          await update(prevWorkDateRef, {
            workHour: workHours,
          });
          await set(workDateRef, {
            workHour: 0,
            daySalary: 0,
            nightSalary: 0,
            holidayAndWeekendSalary: 0,
          });
          setScanMessage('출근 인증이 완료되었습니다');
          toast.success('출근 인증이 완료되었습니다');
        } else if (
          //오늘 기록이 없고 어제기록이 확실히 있을때 당연히 출근이지
          !snapshot.exists() &&
          prevDaySnapshot.val().startTime &&
          prevDaySnapshot.val().endTime
        ) {
          console.log('오늘기록이 없어서 이제 박는거임');
          await set(dbref, { startTime: dateStr });
          await set(workDateRef, {
            workHour: 0,
            daySalary: 0,
            nightSalary: 0,
            holidayAndWeekendSalary: 0,
          });
          setScanMessage('출근 인증이 완료되었습니다');
          toast.success('출근 인증이 완료되었습니다');
        }
      } else {
        await set(dbref, { startTime: dateStr });
        await set(workDateRef, {
          workHour: 0,
          daySalary: 0,
          nightSalary: 0,
          holidayAndWeekendSalary: 0,
        });

        setScanMessage('출근 인증이 완료되었습니다');
        toast.success('출근 인증이 완료되었습니다');
        console.log('외 안박혀;;');
      }

      navigate(`/${currentUser?.photoURL}/companymain`);
    });
    getCompanyInfo();
    return () => {
      setCurrentCompany([]);
    };
  }, [companyCode, userId]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <img
          src={companyLogo}
          alt="회사로고"
          className="rounded-full w-[130px] h-[130px]"
        />
        <div className="font-black">{currentCompany?.companyName}</div>
        <div className="flex items-center">
          {currentUser?.displayName}/{jobName}
        </div>
      </div>
      <div className="h-full w-full">
        {/* <h1>Qr 코드를 스캔하세요</h1> */}
        <div id="reader" className="p-12"></div>
      </div>
    </div>
  );
}

export default QrScan;
