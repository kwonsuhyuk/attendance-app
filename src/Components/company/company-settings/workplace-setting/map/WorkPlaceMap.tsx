import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const KakaoMap = lazy(() => import("./KakaoMap"));

interface WorkPlaceMapProps {
  lat: number;
  lng: number;
  isLoaded: boolean;
  onLocationSelect: (lat: number, lng: number) => void;
  markerDragAble?: boolean;
  radius?: number;
}

const WorkPlaceMap = ({
  lat,
  lng,
  isLoaded,
  onLocationSelect,
  markerDragAble = true,
  radius = 3,
}: WorkPlaceMapProps) => {
  return (
    <Suspense fallback={<Skeleton className="h-48 w-full animate-pulse rounded-md" />}>
      <KakaoMap
        onLocationSelect={onLocationSelect}
        selectedLocation={{ lat, lng }}
        markerDragAble={markerDragAble}
        radius={radius}
      />
    </Suspense>
  );
};

export default WorkPlaceMap;
