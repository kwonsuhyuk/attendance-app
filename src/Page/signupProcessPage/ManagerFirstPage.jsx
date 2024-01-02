import React from "react";
import { useLocation } from "react-router-dom";

function ManagerFirstPage() {
  const { state } = useLocation();
  const { name, password, companyCode, id } = state;
  console.log(state);
  console.log(name, password, companyCode, id);
  return <div>ManagerFirstPage</div>;
}

export default ManagerFirstPage;
