import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const NaverMap = lazy(() => import("./NaverMap"));

interface WorkPlaceMapProps {
  lat: number;
  lng: number;
  isLoaded: boolean;
  onLocationSelect: (lat: number, lng: number) => void;
  markerDragAble?: boolean;
}

const WorkPlaceMap = ({
  lat,
  lng,
  isLoaded,
  onLocationSelect,
  markerDragAble = true,
}: WorkPlaceMapProps) => {
  return (
    <Suspense fallback={<Skeleton className="h-48 w-full animate-pulse rounded-md" />}>
      {isLoaded ? (
        <NaverMap
          onLocationSelect={onLocationSelect}
          selectedLocation={{ lat, lng }}
          markerDragAble={markerDragAble}
        />
      ) : (
        <Skeleton className="h-48 w-full animate-pulse rounded-md" />
      )}
    </Suspense>
  );
};

export default WorkPlaceMap;
