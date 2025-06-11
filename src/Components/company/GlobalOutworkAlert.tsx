import { useEffect, useState } from "react";
import { useOutworkRequests } from "@/hooks/manager/useOutworkRequests";
import { Button } from "@/components/ui/button";
import OutworkRequestModal from "../common/modal/OutworkRequestModal";
import { AlertTriangle } from "lucide-react";

export const GlobalOutworkAlert = () => {
  const { pendingOutworkCount, pendingOutworkList } = useOutworkRequests();
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prevCount, setPrevCount] = useState(pendingOutworkCount);

  useEffect(() => {
    const seen = sessionStorage.getItem("seen_pending_outwork");

    if ((pendingOutworkCount > 0 && !seen) || pendingOutworkCount > prevCount) {
      setShowBanner(true);
      sessionStorage.setItem("seen_pending_outwork", "true");
    }

    setPrevCount(pendingOutworkCount);
  }, [pendingOutworkCount]);

  if (!showBanner || pendingOutworkCount === 0) return null;

  return (
    <>
      <div className="fixed left-1/2 top-6 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-md border border-yellow-400 bg-yellow-100/90 px-4 py-3 shadow-md backdrop-blur-sm dark:border-yellow-500 dark:bg-yellow-800/90">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-yellow-900 dark:text-yellow-100">
            <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-200" />
            <span>
              외근 요청 <strong>{pendingOutworkCount}</strong>건이 승인 대기 중입니다.
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-md border border-yellow-400 bg-white px-3 py-1 text-xs font-semibold text-yellow-700 shadow-sm transition hover:bg-yellow-200 dark:border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-700"
            onClick={() => setShowModal(true)}
          >
            확인하기
          </Button>
        </div>
      </div>

      <OutworkRequestModal
        open={showModal}
        onClose={() => setShowModal(false)}
        pendingOutworkList={pendingOutworkList}
      />
    </>
  );
};
