import { useEffect, useState } from "react";
import { fetchEmployees } from "@/api/employee.api";
import { EmployeeInfo } from "@/model/types/user.type";
import { useUserStore } from "@/store/user.store"; // companyCode 가져오기용

export const useEmployeeSearch = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employees, setEmployees] = useState<EmployeeInfo[]>([]);
  const [searchResults, setSearchResults] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    if (companyCode) {
      fetchEmployees(companyCode).then(setEmployees);
    }
  }, [companyCode]);

  const search = (keyword: string) => {
    if (!keyword) {
      setSearchResults([]);
      return;
    }
    const filtered = employees.filter(emp => emp.name.includes(keyword));
    setSearchResults(filtered);
  };

  return {
    searchResults,
    setSearchResults,
    search,
  };
};
