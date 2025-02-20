import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TJob } from "@/model";

interface JobCardProps {
  job: TJob;
  onRemove: () => void;
}

const JobCard = ({ job, onRemove }: JobCardProps) => {
  return (
    <Card className="flex justify-between items-center p-3">
      <span className="text-sm font-medium">{job.name}</span>
      <Button
        type="button"
        onClick={onRemove}
        className="h-auto p-0 bg-transparent hover:bg-transparent hover:text-red-500"
      >
        <X className="w-5 h-5" />
      </Button>
    </Card>
  );
};

export default JobCard;
