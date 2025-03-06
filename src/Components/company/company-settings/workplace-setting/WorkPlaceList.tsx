import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TworkPlacesList } from "@/model/types/company.type";
import WorkPlaceItem from "./WorkPlaceItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkPlaceListProps {
  workPlaces: TworkPlacesList;
  onRemove: (index: number) => void;
}

const WorkPlaceList = ({ workPlaces, onRemove }: WorkPlaceListProps) => {
  if (workPlaces.length === 0) return null;

  return (
    <Card className="mt-4 w-full">
      <CardHeader>
        <CardTitle className="text-lg">추가된 근무지</CardTitle>
      </CardHeader>
      <ScrollArea className="max-h-72 space-y-2 overflow-y-auto">
        {workPlaces.map((place, index) => (
          <WorkPlaceItem key={place.id} place={place} onRemove={() => onRemove(index)} />
        ))}
      </ScrollArea>
    </Card>
  );
};

export default WorkPlaceList;
