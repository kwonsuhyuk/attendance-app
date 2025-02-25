import CryptoJS from "crypto-js";

// 나중에 env 파일로 옮기기
const SECRET_KEY = "attapp";

// 암호화 함수
export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// 복호화 함수
export const decrypt = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
