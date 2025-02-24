import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TworkPlacesList } from "@/model";
import WorkPlaceItem from "./WorkPlaceItem";

interface WorkPlaceListProps {
  workPlaces: TworkPlacesList;
  onRemove: (index: number) => void;
}

const WorkPlaceList = ({ workPlaces, onRemove }: WorkPlaceListProps) => {
  if (workPlaces.length === 0) return null;

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="text-lg">추가된 근무지</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {workPlaces.map((place, index) => (
          <WorkPlaceItem key={place.id} place={place} onRemove={() => onRemove(index)} />
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkPlaceList;
