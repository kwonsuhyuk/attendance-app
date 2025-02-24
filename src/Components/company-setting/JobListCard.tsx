import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TJobList } from "@/model";
import JobCard from "./JobCard";

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
      <CardContent className="space-y-2">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} onRemove={() => onRemove(index)} />
        ))}
      </CardContent>
    </Card>
  );
};

export default JobListCard;
