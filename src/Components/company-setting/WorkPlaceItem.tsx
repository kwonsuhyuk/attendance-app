import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, X } from "lucide-react";
import { TWorkPlace } from "@/model/types/company.type";

interface WorkPlaceItemProps {
  place: TWorkPlace;
  onRemove: () => void;
}

const WorkPlaceItem = ({ place, onRemove }: WorkPlaceItemProps) => {
  return (
    <Card className="flex items-center justify-between p-3">
      <div className="flex items-center space-x-3">
        <MapPin className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm font-medium">{place.name}</p>
          <p className="text-xs text-gray-500">{place.address}</p>
          <p className="text-xs text-gray-400">
            좌표: ({place.lat}, {place.lng})
          </p>
        </div>
      </div>

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

export default WorkPlaceItem;
