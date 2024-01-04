import { atom } from "recoil";

export const attendanceState = atom({
  key: "attendanceState",
  default: "출석하지 않음",
});

export const userState = atom({
  key: "userState",
  default: { currentUser: null, isLoading: true },
});
