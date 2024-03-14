export function formatMoney(num) {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } else {
    return null;
  }
}

export function numToKorean(num) {
  const units = ['', '만', '억', '조'];
  const nums = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const tens = ['', '십', '백', '천'];

  let result = '';
  let unitIndex = 0;

  while (num > 0) {
    let section = num % 10000; // 만 단위로 끊어서 처리
    if (section) {
      let sectionResult = '';
      let digitIndex = 0;
      while (section > 0) {
        let digit = section % 10;
        if (digit) {
          sectionResult =
            nums[digit] +
            (digit !== 1 ? tens[digitIndex] : tens[digitIndex].slice(0, 1)) +
            sectionResult; // 십, 백, 천의 경우 1은 생략
        }
        section = Math.floor(section / 10);
        digitIndex++;
      }
      result = sectionResult + units[unitIndex] + result;
    }
    num = Math.floor(num / 10000);
    unitIndex++;
  }

  return result;
}
