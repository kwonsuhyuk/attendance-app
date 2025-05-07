import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface PopoverHintProps {
  contentText: string;
  icon: React.ReactNode;
}

const PopoverHint = ({ contentText, icon }: PopoverHintProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="text-gray-500 hover:text-gray-700">
          {icon}
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-64 text-sm text-gray-700">
        {contentText}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverHint;
