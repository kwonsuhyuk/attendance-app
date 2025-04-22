import { TCommuteData } from "@/model/types/commute.type";

export const getWorkTypeFromCommute = (data?: TCommuteData): "출근" | "외근" | undefined => {
  if (!data) return undefined;
  if (data.startTime) return "출근";
  if (data.outworkingMemo || data.startWorkplaceId === "외근") return "외근";
  return undefined;
};
