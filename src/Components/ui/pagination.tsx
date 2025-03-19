import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPageCount: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination = ({ page, totalPageCount, onNext, onPrevious }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-5 py-1">
      <Button
        variant="default"
        size="sm"
        onClick={onPrevious}
        disabled={page === 0}
        className={`px-4 py-2 ${
          page === 0
            ? "cursor-not-allowed bg-white-border-sub text-white-nav-text opacity-50 dark:bg-dark-border-sub dark:text-dark-nav-text"
            : "bg-white-text text-white-bg hover:bg-white-border dark:bg-dark-text dark:text-dark-bg dark:hover:bg-dark-nav-text"
        }`}
      >
        이전
      </Button>

      <span className="text-sm font-medium">
        {page + 1} / {Math.max(1, totalPageCount)}
      </span>

      <Button
        variant="default"
        size="sm"
        onClick={onNext}
        disabled={page >= totalPageCount - 1}
        className={`px-4 py-2 ${
          page >= totalPageCount - 1
            ? "cursor-not-allowed bg-white-border-sub text-white-nav-text opacity-50 dark:bg-dark-border-sub dark:text-dark-nav-text"
            : "bg-white-text text-white-bg hover:bg-white-border dark:bg-dark-text dark:text-dark-bg dark:hover:bg-dark-nav-text"
        }`}
      >
        다음
      </Button>
    </div>
  );
};

export default Pagination;
