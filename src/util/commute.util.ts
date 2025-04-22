import { TCommuteData, TCommuteStatus } from "@/model/types/commute.type";

export function computeCommuteStatus(
  today: TCommuteData | null,
  yesterday: TCommuteData | null,
): { status: TCommuteStatus; data: TCommuteData | null } {
  const hasStartToday = !!today?.startTime;
  const hasEndToday = !!today?.endTime;
  const hasStartYesterday = !!yesterday?.startTime;
  const hasEndYesterday = !!yesterday?.endTime;

  const isOutWorkToday = today?.startWorkplaceId === "외근";
  if (isOutWorkToday) {
    return { status: "out-working", data: today };
  }

  if (hasStartYesterday && !hasEndYesterday && !hasStartToday && !hasEndToday) {
    return { status: "checked-in-only", data: yesterday };
  }

  if (hasStartYesterday && hasEndToday && !hasStartToday) {
    return {
      status: "checked-in-and-out",
      data: {
        ...yesterday!,
        endTime: today!.endTime,
        endWorkplaceId: today!.endWorkplaceId,
      },
    };
  }

  if (hasStartToday && hasEndToday) {
    return { status: "checked-in-and-out", data: today };
  }

  if (hasStartToday && !hasEndToday) {
    return { status: "checked-in-only", data: today };
  }

  if (!hasStartToday && hasEndToday) {
    return { status: "missing-check-in", data: today };
  }

  return { status: "not-checked-in", data: today };
}
