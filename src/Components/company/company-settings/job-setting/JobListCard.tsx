import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TJobList } from "@/model/types/company.type";
import JobCard from "./JobCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JobListCardProps {
  jobs: TJobList;
  onRemove: (index: number) => void;
}

const JobListCard = ({ jobs, onRemove }: JobListCardProps) => {
  if (jobs.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">추가된 직무 목록</CardTitle>
      </CardHeader>
      <ScrollArea className="max-h-52 space-y-2 overflow-y-auto">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} onRemove={() => onRemove(index)} />
        ))}
      </ScrollArea>
    </Card>
  );
};

export default JobListCard;
