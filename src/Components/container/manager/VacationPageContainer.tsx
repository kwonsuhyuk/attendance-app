import { Card } from "@/components/ui/card";
import React from "react";

const VacationPageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Card>{children}</Card>;
};

export default VacationPageContainer;
