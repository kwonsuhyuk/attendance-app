import { TCommuteRecord } from "@/model/types/commute.type";
import { TEmpUserData } from "@/model/types/user.type";

export type TWorkplaceEmployee = {
  userId: string;
  name: string;
  jobName: string;
  employmentType: string;
  phoneNumber: string;
  memo?: string; // 외근 메모
  startTime?: string; // 출근 시간
  endTime?: string; // 퇴근 시간
};

export type TPlaceData = {
  id: string;
  name: string;
  address?: string;
  memo?: string;
  employees: TWorkplaceEmployee[];
};

interface IUseFilterWorkResult {
  workplacePlaces: TPlaceData[];
  outworkingPlace: TPlaceData;
  notCommutePlace: TPlaceData;
}

export function useFilterWork(
  commuteData: TCommuteRecord[],
  placeList: { id: string; name: string; address: string; memo?: string }[],
  users: TEmpUserData[],
): IUseFilterWorkResult {
  const grouped: Record<string, TWorkplaceEmployee[]> = {};

  commuteData.forEach(entry => {
    const workplaceId = entry.startWorkplaceId;

    const baseEmployee: TWorkplaceEmployee = {
      userId: entry.userInfo?.uid || "-",
      name: entry.userInfo?.name || "-",
      jobName: entry.userInfo?.jobName || "-",
      employmentType: entry.userInfo?.employmentType || "-",
      phoneNumber: entry.userInfo?.phoneNumber || "-",
    };

    if (!workplaceId) {
      if (!grouped["미출근"]) grouped["미출근"] = [];
      grouped["미출근"].push(baseEmployee);
    } else if (workplaceId === "외근") {
      const employee: TWorkplaceEmployee = {
        ...baseEmployee,
        memo: entry.outworkingMemo || "-",
      };

      if (!grouped["외근"]) grouped["외근"] = [];
      grouped["외근"].push(employee);
    } else {
      const employee: TWorkplaceEmployee = {
        ...baseEmployee,
        startTime: entry.startTime || "-",
        endTime: entry.endTime || "-",
      };

      if (!grouped[workplaceId]) grouped[workplaceId] = [];
      grouped[workplaceId].push(employee);
    }
  });

  // 출근 기록 있는 유저 ID 모음
  const attendedUserIds = new Set(
    commuteData.map(entry => entry.userInfo?.uid).filter((id): id is string => !!id),
  );

  // ❗ 전체 유저 중 출근 기록이 아예 없는 사람을 미출근에 추가
  users.forEach(user => {
    if (!attendedUserIds.has(user.uid)) {
      const employee: TWorkplaceEmployee = {
        userId: user.uid,
        name: user.name,
        jobName: user.jobName,
        employmentType: user.employmentType,
        phoneNumber: user.phoneNumber,
      };

      if (!grouped["미출근"]) grouped["미출근"] = [];
      grouped["미출근"].push(employee);
    }
  });

  // 근무지별 매칭 (id 기준)
  const workplacePlaces: TPlaceData[] = placeList.map(place => ({
    ...place,
    employees: grouped[place.id] || [],
  }));

  // 외근 데이터
  const outworkingPlace: TPlaceData = {
    id: "외근",
    name: "외근",
    employees: grouped["외근"] || [],
  };

  // 미출근 데이터
  const notCommutePlace: TPlaceData = {
    id: "미출근",
    name: "미출근",
    employees: grouped["미출근"] || [],
  };

  return {
    workplacePlaces,
    outworkingPlace,
    notCommutePlace,
  };
}
