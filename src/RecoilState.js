import { atom } from "recoil";

export const attendanceState = atom({
  key: "attendanceState",
  default: "출석하지 않음",
});
export const isLoading = atom({
  key: "isLoading",
  default: true,
});
export const user = atom({
  key: "user",
  default: "",
});
