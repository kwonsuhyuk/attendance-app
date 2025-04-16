export default function convertTime(decimalTime) {
  let hours = Math.floor(decimalTime);
  let minutes = Math.round((decimalTime - hours) * 60);
  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }
  return `${hours}시간 ${minutes}분`;
}

export const formatDate = (date: Date): string => {
  const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = weekDay[date.getDay()];

  return `${month}월 ${day}일 ${dayOfWeek}요일`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatRawUTCToHHMM = (utc: string): string => {
  const date = new Date(utc);
  return date.toISOString().slice(11, 16); // "HH:MM"
};

// export const getKSTDateInfo = (utc: string): string => {
//   const utcDate = new Date(utc);
//   const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

//   const now = new Date();
//   const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);

//   const kstDateYMD = kstDate.toISOString().slice(0, 10);
//   const todayYMD = kstNow.toISOString().slice(0, 10);

//   const yesterday = new Date(kstNow);
//   yesterday.setDate(kstNow.getDate() - 1);
//   const yesterdayYMD = yesterday.toISOString().slice(0, 10);

//   let prefix = "";
//   if (kstDateYMD === todayYMD) prefix = "오늘";
//   else if (kstDateYMD === yesterdayYMD) prefix = "어제";
//   else prefix = `${kstDateYMD.replace(/-/g, ".")}`;

//   const time = formatRawUTCToHHMM(utc);

//   return `${prefix} ${time}`;
// };

export function getKSTDateInfo(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
