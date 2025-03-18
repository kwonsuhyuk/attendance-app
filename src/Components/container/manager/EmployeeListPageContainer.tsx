import { Card } from "@/components/ui/card";
import React from "react";

const EmployeeListPageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Card className="max-w-7xl flex-1">{children}</Card>;
};

export default EmployeeListPageContainer;
