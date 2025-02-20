import { Card } from "antd";
import React from "react";

interface INoticeCardProps {
  title: string;
  description: React.ReactNode | string;
}

const NoticeCard = ({ title, description }: INoticeCardProps) => {
  return (
    <Card className="w-full bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 text-center">{title}</h3>
      <p className="text-sm text-gray-600 mt-2 text-center">{description}</p>
    </Card>
  );
};

export default NoticeCard;
