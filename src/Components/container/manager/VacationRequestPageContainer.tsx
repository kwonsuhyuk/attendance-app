import { Card } from "@/components/ui/card";
import React from "react";

const VacationRequestPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="max-w-7xl flex-1" data-tour="body">
      {children}
    </Card>
  );
};

export default VacationRequestPageContainer;
