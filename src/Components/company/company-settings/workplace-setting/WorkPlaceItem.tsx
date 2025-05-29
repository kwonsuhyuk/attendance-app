import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, X } from "lucide-react";
import { TWorkPlace } from "@/model/types/company.type";
import clsx from "clsx";

interface WorkPlaceItemProps {
  place: TWorkPlace;
  onRemove?: () => void;
  onEdit?: (place: TWorkPlace) => void;
}

const WorkPlaceItem = ({ place, onRemove, onEdit }: WorkPlaceItemProps) => {
  const clickable = !!onEdit;

  return (
    <Card
      onClick={() => onEdit?.(place)}
      className={clsx(
        "group relative flex items-start gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition",
        clickable ? "cursor-pointer hover:border-gray-300 hover:bg-muted dark:hover:bg-muted" : "",
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-point-color/10 text-point-color dark:bg-point-color/20 dark:text-point-color">
        <MapPin className="h-5 w-5" />
      </div>

      <div className="flex flex-1 flex-col space-y-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{place.name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{place.address}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="relative z-10 flex items-center gap-1 rounded-full bg-blue-50 px-3 py-0.5 text-[10px] font-medium text-blue-700 transition hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-800/30"
          >
            지도에서 보기
          </a>

          {place.radius && (
            <div className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              반경: {place.radius >= 1000 ? `${place.radius / 1000}km` : `${place.radius}m`}
            </div>
          )}
        </div>
      </div>

      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={clsx(
            "absolute right-2 top-2 h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-transparent hover:text-red-500",
            "opacity-0 transition group-hover:opacity-100",
          )}
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Card>
  );
};

export default WorkPlaceItem;
