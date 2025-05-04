export default function convertTime(decimalTime) {
  let hours = Math.floor(decimalTime);
  let minutes = Math.round((decimalTime - hours) * 60);
  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }
  return `${hours}시간 ${minutes}분`;
}

export const getKSTFormattedDate = (date: Date) => {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().split("T")[0];
};

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

export function getKSTDateInfo(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export const calculateWorkDuration = (start: string, end: string): string => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffMs = endTime.getTime() - startTime.getTime();

  if (diffMs <= 0) return "0분";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  } else {
    return `${minutes}분`;
  }
};
