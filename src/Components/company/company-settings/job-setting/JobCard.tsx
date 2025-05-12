import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TJob } from "@/model/types/company.type";

interface JobCardProps {
  job: TJob;
  onRemove: () => void;
}

const JobCard = ({ job, onRemove }: JobCardProps) => {
  return (
    <Card className="flex items-center justify-between p-4">
      <span className="text-sm font-medium">{job.name}</span>
      <Button
        type="button"
        variant="outline"
        onClick={onRemove}
        className="h-auto bg-transparent p-0 hover:bg-transparent hover:text-red-500"
      >
        <X className="h-5 w-5" />
      </Button>
    </Card>
  );
};

export default JobCard;
