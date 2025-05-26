import AutoCompleteUserInput from "@/components/common/AutoCompleteInput";
import Settlement from "@/components/company/attendance/Settlement";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import usePeriodAttendance from "@/hooks/manager/usePeriodAttendance";
import { EmployeeInfo } from "@/model/types/user.type";
import React from "react";

const SettlementPage = () => {
  const { employeeList } = useEmployeeList();
  const { currentDate, selectedEmployee, setSelectedEmployee, setEmployeeName, setCurrentDate } =
    usePeriodAttendance(employeeList);

  return (
    <>
      <Settlement
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        setEmployeeName={setEmployeeName}
      />
    </>
  );
};

export default SettlementPage;
