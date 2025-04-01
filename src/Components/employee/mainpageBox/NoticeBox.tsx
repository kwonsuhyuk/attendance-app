import { Card, CardTitle } from "@/components/ui/card";
import { ChevronRight, Megaphone } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoticeBox = () => {
  const navigate = useNavigate();

  return (
    <Card
      className="relative cursor-pointer p-4 shadow-md transition hover:bg-gray-50 dark:hover:bg-dark-card-bg"
      onClick={() => navigate("/notice")}
    >
      {/* 우측 이동 아이콘 */}
      <ChevronRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
      <CardTitle className="flex items-center gap-2 text-base">
        <Megaphone /> 회사 공지사항
      </CardTitle>
      {/* 추가 api 연동후에 추가 작업 예정 */}
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        [중요] 5월 근태 정책 변경 안내드립니다. 확인 바랍니다.
      </p>
    </Card>
  );
};

export default NoticeBox;
