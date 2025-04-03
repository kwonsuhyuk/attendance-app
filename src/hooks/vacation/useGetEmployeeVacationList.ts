// hooks/useGetEmployeeVacationList.ts
import { useEffect, useState } from "react";
import { TVacationRequest, TRegisteredVacation } from "@/model/types/vacation.type";
import { fetchRegisteredVacationsByYear, fetchVacationRequests } from "@/api/vacation.api";

interface IUseGetEmployeeVacationList {
  companyCode: string;
  userId: string;
  year?: string; // 선택적으로 연도 지정 가능
}

interface IEmployeeVacationList {
  requests: TVacationRequest[];
  registered: TRegisteredVacation[];
  loading: boolean;
  error: string | null;
}

export const useGetEmployeeVacationList = ({
  companyCode,
  userId,
  year,
}: IUseGetEmployeeVacationList): IEmployeeVacationList => {
  const [requests, setRequests] = useState<TVacationRequest[]>([]);
  const [registered, setRegistered] = useState<TRegisteredVacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [requestData, registerData] = await Promise.all([
          fetchVacationRequests(companyCode),
          fetchRegisteredVacationsByYear(companyCode, year || new Date().getFullYear().toString()),
        ]);

        // 요청 목록 필터링
        // 요청 목록 최신순 정렬
        const filteredRequests = requestData
          ? Object.entries(requestData)
              .filter(([, data]) => data.requester?.uid === userId)
              .map(([key, value]) => ({ ...value, requestId: key }))
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          : [];

        // 등록 목록 최신순 정렬
        const filteredRegistered: TRegisteredVacation[] = [];

        if (registerData) {
          Object.values(registerData).forEach(monthData => {
            const userData = monthData[userId];
            if (userData) {
              Object.entries(userData).forEach(([registerId, data]) => {
                if (data && typeof data === "object") {
                  filteredRegistered.push({
                    ...(data as TRegisteredVacation),
                    registerId,
                  });
                }
              });
            }
          });

          filteredRegistered.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        }

        setRequests(filteredRequests);
        setRegistered(filteredRegistered);
      } catch (err) {
        console.error("휴가 데이터 조회 실패:", err);
        setError("휴가 정보를 가져오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (companyCode && userId) fetchData();
  }, [companyCode, userId, year]);

  return { requests, registered, loading, error };
};
