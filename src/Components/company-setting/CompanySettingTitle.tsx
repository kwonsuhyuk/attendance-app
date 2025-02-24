import React from "react";

interface ICompanySettingTitleProps {
  title: string;
  description: React.ReactNode | string;
}

const CompanySettingTitle = ({ title, description }: ICompanySettingTitleProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </>
  );
};

export default CompanySettingTitle;
