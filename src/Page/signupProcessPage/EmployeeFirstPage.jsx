import React from "react";
import { useLocation } from "react-router-dom";

function EmployeeFirstPage() {
  const { state } = useLocation();
  const { name, companyCode, id } = state;
  console.log(state);
  return <div>{(name, companyCode, id)}</div>;
}

export default EmployeeFirstPage;
