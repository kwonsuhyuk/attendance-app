import { atom } from 'recoil';

export const attendanceState = atom({
  key: 'attendanceState',
  default: '출석하지 않음',
});
export const loading = atom({
  key: 'loading',
  default: '',
});
export const user = atom({
  key: 'user',
  default: '',
});
