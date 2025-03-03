import React from "react";

interface ICompanySettingTitleProps {
  title: string;
  description: React.ReactNode | string;
}

const CompanySettingTitle = ({ title, description }: ICompanySettingTitleProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text">{title}</h2>
      <p className="text-center text-sm text-gray-600 dark:text-dark-nav-text">{description}</p>
    </>
  );
};

export default CompanySettingTitle;
