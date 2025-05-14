import { Card, CardTitle } from "@/components/ui/card";
import { ChevronRight, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listenNotices } from "@/api/notice.api";
import { TNotice } from "@/model/types/manager.type";
import { differenceInDays, parseISO } from "date-fns";

const NoticeBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();
  const [latestNotice, setLatestNotice] = useState<TNotice | null>(null);

  const isNewNotice = (createdAt: string, days = 3) => {
    // 3일동안 다른 공지가 안 올라오면 빨간 점 사라짐
    const createdDate = parseISO(createdAt);
    return differenceInDays(new Date(), createdDate) <= days;
  };

  useEffect(() => {
    if (!companyCode) return;

    listenNotices(companyCode, notices => {
      setLatestNotice(notices[0] ?? null);
    });
  }, [companyCode]);

  return (
    <Card
      className="relative cursor-pointer p-4 shadow-md transition hover:bg-gray-50 dark:hover:bg-dark-card-bg"
      onClick={() => navigate(`/${companyCode}/notice`)}
    >
      <ChevronRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
      <CardTitle className="flex items-center gap-2 text-base">
        <div className="relative flex items-center">
          <Megaphone />
          {latestNotice?.createdAt && isNewNotice(latestNotice.createdAt) && (
            <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
        회사 공지사항
      </CardTitle>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {latestNotice ? latestNotice.title : "등록된 공지사항이 없습니다."}
      </p>
    </Card>
  );
};

export default NoticeBox;
