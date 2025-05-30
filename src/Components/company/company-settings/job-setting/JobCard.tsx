import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, X } from "lucide-react";
import { TJob } from "@/model/types/company.type";
import clsx from "clsx";

interface JobCardProps {
  job: TJob;
  onRemove: () => void;
}

const JobCard = ({ job, onRemove }: JobCardProps) => {
  return (
    <Card
      className={clsx(
        "group relative flex items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition",
        "hover:border-gray-300 hover:bg-muted dark:border-dark-border dark:hover:bg-muted",
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-point-color/10 text-point-color dark:bg-point-color/20 dark:text-point-color">
        <Briefcase className="h-4 w-4" />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{job.name}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={clsx(
          "absolute right-2 top-2 h-7 w-7 rounded-full p-0 text-gray-400 hover:text-red-500",
          "opacity-0 transition group-hover:opacity-100",
        )}
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </Card>
  );
};

export default JobCard;
