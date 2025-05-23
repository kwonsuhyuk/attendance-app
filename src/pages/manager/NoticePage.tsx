import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import NoticeModal from "@/components/common/modal/NoticeModal";
import NoticeCard from "@/components/company/notice/NoticeCard";
import { Button } from "@/components/ui/button";
import { TNotice } from "@/model/types/manager.type";
import { useNotice } from "@/hooks/manager/useNotice";
import { useUserStore } from "@/store/user.store";
import { deleteNotice } from "@/api/notice.api";
import { ChevronUp, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { noticeTourSteps } from "@/constants/managerTourSteps";
import { useTour } from "@/hooks/use-tour";
import { useTourStore } from "@/store/tour.store";

const NoticePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notices, addNotice } = useNotice();
  const userType = useUserStore(state => state.currentUser?.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const { toast } = useToast();

  useTour("notice", noticeTourSteps, [1]);

  const run = useTourStore(state => state.run);
  const steps = useTourStore(state => state.steps);
  const stepIndex = useTourStore(state => state.stepIndex);
  const setStepIndex = useTourStore(state => state.setStepIndex);

  const handleClickWriteButton = () => {
    setIsModalOpen(true);

    const currentStep = steps[stepIndex];
    if (run && currentStep?.target === '[data-tour="notice-1"]') {
      setTimeout(() => {
        const target = document.querySelector('[data-tour="notice-2"]');
        if (target) {
          setStepIndex(stepIndex + 1);
        }
      }, 300);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // body에 Dialog가 추가한 스타일 제거
    document.body.classList.remove("overflow-hidden");
    document.body.style.removeProperty("padding-right");

    // 모달 투어 스텝 처리 (현재 notice-2가 열린 상태라면 다음 스텝으로)
    const currentStep = steps[stepIndex];
    if (run && currentStep?.target === '[data-tour="notice-modal"]') {
      setTimeout(() => {
        setStepIndex(stepIndex + 1);
      }, 300);
    }
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
          <div className="flex items-center justify-between gap-3">
            <Megaphone className="mb-1 h-6 w-6 text-white-text dark:text-dark-text" />
            <h2 className="text-lg font-bold text-white-text dark:text-dark-text">공지사항</h2>
            <span className="text-sm text-muted-foreground">총 {notices.length}개</span>
          </div>

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
            <p className="text-sm text-muted-foreground">등록된 공지사항이 없습니다.</p>
          ) : (
            sortedNotices.map((notice, idx) =>
              notice.id ? (
                <NoticeCard key={notice.id} {...notice} onDelete={() => handleDelete(notice.id!)} />
              ) : null,
            )
          )}
        </div>
      </div>

      {visibleNotices.length > noticesPerPage && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="dark:hover:bg-dark-hover flex h-10 w-10 items-center justify-center rounded-full bg-dark-bg shadow-md transition dark:bg-white-bg"
            aria-label="맨 위로"
          >
            <ChevronUp className="h-7 w-7 text-dark-text dark:text-white-text" />
          </button>
        </div>
      )}

      {isModalOpen && (
        <NoticeModal
          onClose={handleCloseModal} // 기존 onClose에 handleCloseModal 연결
          onSave={handleSaveNotice}
        />
      )}
    </>
  );
};

export default NoticePage;
