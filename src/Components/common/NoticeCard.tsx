import React from "react";
import { Card } from "../ui/card";

interface INoticeCardProps {
  title: string;
  description: React.ReactNode | string;
}

const NoticeCard = ({ title, description }: INoticeCardProps) => {
  return (
    <Card className="w-full rounded-lg bg-blue-50 p-4">
      <h3 className="text-center text-lg font-semibold text-gray-700">{title}</h3>
      <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
    </Card>
  );
};

export default NoticeCard;
