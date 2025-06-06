import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import NoticeModal from "@/components/common/modal/NoticeModal";
import NoticeCard from "@/components/company/notice/NoticeCard";
import { Button } from "@/components/ui/button";
import { TNotice } from "@/model/types/manager.type";
import { useNotice } from "@/hooks/manager/useNotice";
import { useUserStore } from "@/store/user.store";
import { deleteNotice } from "@/api/notice.api";
import { ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { noticeTourSteps } from "@/constants/managerTourSteps";
import { useTour } from "@/hooks/use-tour";
import { useTourStore } from "@/store/tour.store";
import NoticeDetailModal from "@/components/company/notice/NoticeDetailModal";
import { useShallow } from "zustand/shallow";

const NoticePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<TNotice | null>(null);
  const { notices, addNotice } = useNotice();
  const userType = useUserStore(state => state.currentUser?.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const { toast } = useToast();

  useTour("notice", noticeTourSteps);

  const handleClickWriteButton = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [page, setPage] = useState(1);
  const noticesPerPage = 6;

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.noticeType === "중요" && b.noticeType !== "중요") return -1;
    if (a.noticeType !== "중요" && b.noticeType === "중요") return 1;
    return 0;
  });

  const visibleNotices = sortedNotices.slice(0, page * noticesPerPage);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - 100;

      if (scrollPosition >= bottom && page * noticesPerPage < sortedNotices.length) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, sortedNotices.length]);

  const handleSaveNotice = async (newNotice: TNotice) => {
    await addNotice(newNotice);
    setIsModalOpen(false);

    toast({
      title: "공지사항 등록 완료",
      description: "새로운 공지사항이 등록되었습니다.",
    });
  };

  const handleDelete = async (id: string) => {
    if (!companyCode) return;

    const isConfirmed = window.confirm("정말로 이 공지사항을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    await deleteNotice(companyCode, id);

    toast({
      title: "공지사항 삭제 완료",
      description: "선택한 공지사항이 삭제되었습니다.",
    });
  };

  return (
    <>
      <Seo title="공지사항 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />

      <div className="flex w-full flex-col gap-4 sm:py-2">
        <div className="flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {userType === "manager" && (
            <Button
              data-tour="notice-1"
              onClick={handleClickWriteButton}
              className="text-sm font-semibold"
            >
              작성
            </Button>
          )}
        </div>

        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2">
          {sortedNotices.length === 0 ? (
            <>
              <div
                data-tour="notice-3"
                className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400"
              >
                등록된 공지사항이 없습니다.
              </div>
            </>
          ) : (
            sortedNotices.map(notice =>
              notice.id ? (
                <NoticeCard
                  key={notice.id}
                  {...notice}
                  onClick={() => setSelectedNotice(notice)}
                  onDelete={userType === "manager" ? () => handleDelete(notice.id!) : undefined}
                />
              ) : null,
            )
          )}
        </div>
      </div>

      {visibleNotices.length > noticesPerPage && (
        <div className="fixed bottom-20 right-7 z-50 -translate-y-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="dark:hover:bg-dark-hover flex h-12 w-12 items-center justify-center rounded-full bg-dark-bg shadow-md transition dark:bg-white-bg"
            aria-label="맨 위로"
          >
            <ChevronUp className="h-7 w-7 text-dark-text dark:text-white-text" />
          </button>
        </div>
      )}

      {isModalOpen && <NoticeModal onClose={handleCloseModal} onSave={handleSaveNotice} />}

      {selectedNotice && (
        <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}
    </>
  );
};

export default NoticePage;
