import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowMoreButton = ({ showAll, setShowAll }: Props) => {
  return (
    <div className="text-center">
      <Button
        variant="outline"
        size="sm"
        className="mx-auto flex items-center gap-1"
        onClick={() => setShowAll(prev => !prev)}
      >
        {showAll ? (
          <>
            접기 <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            더보기 <ChevronDown className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ShowMoreButton;
