// 현재 날짜 기준 "YYYY-MM" 반환
export const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

// "YYYY-MM-DD" → "YYYY-MM"으로 변환
export const getYearMonthFromDate = (dateStr: string) => {
  return dateStr.slice(0, 7);
};
