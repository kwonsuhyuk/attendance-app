import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TWorkPlace, TworkPlacesList } from "@/model/types/company.type";
import WorkPlaceItem from "./WorkPlaceItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkPlaceListProps {
  workPlaces: TworkPlacesList;
  onRemove: (index: number) => void;
  onEdit?: (place: TWorkPlace) => void;
}

const WorkPlaceList = ({ workPlaces, onRemove, onEdit }: WorkPlaceListProps) => {
  return (
    <Card className="mt-4 w-full">
      <CardHeader>
        <CardTitle className="text-lg">추가된 근무지</CardTitle>
        <p className="text-xs">*근무지 선택 시, 수정이 가능합니다.</p>
      </CardHeader>
      <CardContent className="px-6">
        {workPlaces.length === 0 ? (
          <div className="rounded-sm border border-solid border-white-border-sub p-12 dark:border-dark-border">
            <p className="text-center text-sm text-muted-foreground">추가된 근무지가 없습니다.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-72 overflow-y-auto rounded-sm border border-solid border-white-border-sub dark:border-dark-border">
            {workPlaces.map((place, index) => (
              <WorkPlaceItem
                key={place.id}
                place={place}
                onRemove={() => onRemove(index)}
                onEdit={onEdit} // ✅ 전달
              />
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkPlaceList;
