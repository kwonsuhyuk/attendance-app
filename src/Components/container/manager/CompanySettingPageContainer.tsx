import { Card } from "@/components/ui/card";
import React from "react";

const CompanySettingPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="relative mx-auto flex w-full max-w-4xl flex-col justify-between space-y-10 rounded-2xl border bg-white px-8">
      {children}
    </Card>
  );
};

export default CompanySettingPageContainer;
