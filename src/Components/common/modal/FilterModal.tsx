import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { TJobList } from "@/model/types/company.type";

interface FilterModalProps {
  jobList: TJobList;
}

const FilterModal = ({ jobList }: FilterModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 sm:w-fit">
          <FilterIcon className="h-5 w-5" />
          직원 상세 검색
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <div className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="h-10 dark:bg-dark-border-sub dark:text-white-bg">
              <SelectValue placeholder="직종 선택" />
            </SelectTrigger>
            <SelectContent className="dark:border-dark-border dark:bg-dark-bg">
              <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
                전체
              </SelectItem>
              {jobList.map(job => (
                <SelectItem key={job.id} value={job.name} className="dark:hover:bg-dark-border">
                  {job.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input className="h-10 w-full rounded-md placeholder:text-sm" placeholder="이름 검색" />
          <Button className="h-10 w-full rounded-md">검색</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
