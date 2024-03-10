export default function convertTime(decimalTime) {
  let hours = Math.floor(decimalTime);
  let minutes = Math.round((decimalTime - hours) * 60);
  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }
  return `${hours}시간 ${minutes}분`;
}
