import Layout from "@/layout/ManagerLayout";
import React from "react";

const ManagerPageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default ManagerPageContainer;
