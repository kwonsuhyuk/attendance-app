import { useState, useMemo } from "react";
import { TVacationRequest, TVacationStatus } from "@/model/types/vacation.type";
import { EMPLOYEE_VACATION_ITEMS_PER_PAGE } from "@/constants/pagination";

export const useFilteredVacationRequests = (
  requests: TVacationRequest[],
  year: string,
  filterStatus: "전체" | TVacationStatus,
  currentPage: number,
) => {
  const filteredRequests = useMemo(() => {
    const statusFiltered =
      filterStatus === "전체" ? requests : requests.filter(req => req.status === filterStatus);

    return statusFiltered.filter(req => {
      const startYear = new Date(req.startDate).getFullYear();
      const endYear = new Date(req.endDate).getFullYear();
      return startYear === Number(year) || endYear === Number(year);
    });
  }, [requests, filterStatus, year]);

  const totalPageCount = Math.ceil(filteredRequests.length / EMPLOYEE_VACATION_ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    currentPage * EMPLOYEE_VACATION_ITEMS_PER_PAGE,
    (currentPage + 1) * EMPLOYEE_VACATION_ITEMS_PER_PAGE,
  );

  return {
    paginatedRequests,
    totalPageCount,
    yearFilteredRequests: filteredRequests,
  };
};
