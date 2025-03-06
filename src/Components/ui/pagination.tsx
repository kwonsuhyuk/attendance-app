import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPageCount: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination = ({ page, totalPageCount, onNext, onPrevious }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-5 py-4">
      <Button variant="default" size="sm" onClick={onPrevious} disabled={page === 0}>
        이전
      </Button>
      <span>
        {page + 1} / {Math.max(1, totalPageCount)}
      </span>
      <Button variant="default" size="sm" onClick={onNext} disabled={page >= totalPageCount - 1}>
        다음
      </Button>
    </div>
  );
};

export default Pagination;
