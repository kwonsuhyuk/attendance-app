import { Card } from "@/components/ui/card";
import React from "react";

const VacationPageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Card className="flex-1">{children}</Card>;
};

export default VacationPageContainer;
