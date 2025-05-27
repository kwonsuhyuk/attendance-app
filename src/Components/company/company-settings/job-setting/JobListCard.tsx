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
    <Card className="w-full" data-tour="joblist_set-2">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">추가된 직무 목록</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="max-h-72 overflow-y-auto rounded-lg border border-solid border-white-border-sub dark:border-dark-border">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} onRemove={() => onRemove(index)} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default JobListCard;
