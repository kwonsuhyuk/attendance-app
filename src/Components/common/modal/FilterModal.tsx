import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

const FilterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-10 items-center justify-center gap-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 sm:w-auto">
          <FilterIcon className="h-5 w-5" />
          직원 상세 검색
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-4">
        <div className="flex flex-col gap-5">
          <Input className="h-10 w-full rounded-md placeholder:text-sm" placeholder="이름 검색" />
          <Button className="h-10 w-full rounded-md">검색</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
