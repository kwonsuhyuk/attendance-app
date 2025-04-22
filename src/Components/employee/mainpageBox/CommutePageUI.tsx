import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { TWorkPlace } from "@/model/types/company.type";

interface CommuteHeaderProps {
  isCheckoutMode: boolean;
}

export const CommuteHeader = ({ isCheckoutMode }: CommuteHeaderProps) => (
  <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-300">
    <MapPin className="h-5 w-5" />
    <h2 className="text-lg font-semibold">
      {isCheckoutMode ? "퇴근하실 근무지를 선택해주세요" : "출근하실 근무지를 선택해주세요"}
    </h2>
  </div>
);

interface CommutePlaceItemProps {
  place: TWorkPlace;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const CommutePlaceItem = ({ place, isSelected, onSelect }: CommutePlaceItemProps) => {
  return (
    <button
      onClick={() => onSelect(place.id)}
      className={`relative w-full rounded-xl border px-5 py-4 text-left transition-all duration-200 ease-in-out ${
        isSelected
          ? "dark:bg-dark-accent border-blue-500 bg-blue-50 shadow-md dark:border-blue-400"
          : "dark:hover:bg-dark-hover border-gray-200 bg-white-card-bg hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm dark:border-gray-700 dark:bg-dark-card-bg dark:hover:border-blue-400"
      }`}
    >
      {isSelected && (
        <CheckCircle className="absolute right-4 top-4 h-5 w-5 text-blue-500 dark:text-blue-400" />
      )}
      <p
        className={`text-base font-semibold ${
          isSelected ? "text-gray-900 dark:text-black" : "text-gray-900 dark:text-white"
        }`}
      >
        {place.name}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{place.address}</p>
      {place.memo && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{place.memo}</p>}
    </button>
  );
};

interface CommutePlaceListProps {
  places: TWorkPlace[];
  selectedPlaceId: string | null;
  onSelect: (id: string) => void;
}

export const CommutePlaceList = ({ places, selectedPlaceId, onSelect }: CommutePlaceListProps) => {
  return (
    <div className="space-y-4">
      {places.map(place => (
        <CommutePlaceItem
          key={place.id}
          place={place}
          isSelected={selectedPlaceId === place.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

interface CommuteButtonProps {
  isCheckoutMode: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const CommuteButton = ({ isCheckoutMode, disabled, onClick }: CommuteButtonProps) => (
  <Button
    disabled={disabled}
    className={`w-full ${disabled ? "bg-muted text-muted-foreground" : ""} `}
    onClick={onClick}
    variant={disabled ? "secondary" : "default"}
  >
    {isCheckoutMode ? "퇴근하기" : "출근하기"}
  </Button>
);
