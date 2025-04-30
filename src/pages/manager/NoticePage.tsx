import { useState } from "react";
import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";
import Seo from "@/components/Seo";
import NoticeModal from "@/components/common/modal/NoticeModal";
import NoticeCard from "@/components/company/notice/NoticeCard";
import { Button } from "@/components/ui/button";
import { TNotice } from "@/model/types/manager.type";
import { useNotice } from "@/hooks/manager/useNotice";
import { useUserStore } from "@/store/user.store";

const NoticePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notices, addNotice } = useNotice();
  const userType = useUserStore(state => state.currentUser?.userType);

  const handleSaveNotice = async (newNotice: TNotice) => {
    await addNotice(newNotice);
    setIsModalOpen(false);
  };

  return (
    <>
      <Seo title="공지사항 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col gap-4 sm:py-5">
        <div className="flex items-center justify-between px-4 sm:px-6">
          {/* <EmployeeEtcPageTitle /> */}
          {userType === "manager" && (
            <Button onClick={() => setIsModalOpen(true)} className="text-sm font-semibold">
              작성
            </Button>
          )}
        </div>

        <div className="flex max-w-5xl flex-col gap-4 px-4 sm:px-6">
          {notices.length === 0 ? (
            <p className="text-sm text-muted-foreground">등록된 공지사항이 없습니다.</p>
          ) : (
            notices.map((notice, idx) => <NoticeCard key={idx} {...notice} />)
          )}
        </div>
      </div>

      {isModalOpen && (
        <NoticeModal onClose={() => setIsModalOpen(false)} onSave={handleSaveNotice} />
      )}
    </>
  );
};

export default NoticePage;
