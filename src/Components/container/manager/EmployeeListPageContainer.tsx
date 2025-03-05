import { Card } from "@/components/ui/card";
import React from "react";

const CompanySettingPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="flex w-full max-w-6xl flex-col items-center space-y-6 shadow-lg">
      {children}
    </Card>
  );
};

export default CompanySettingPageContainer;
