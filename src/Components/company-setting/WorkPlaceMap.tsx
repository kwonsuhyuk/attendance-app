import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const NaverMap = lazy(() => import("../map/NaverMap"));

interface WorkPlaceMapProps {
  lat: number;
  lng: number;
  isLoaded: boolean;
  onLocationSelect: (lat: number, lng: number) => void;
}

const WorkPlaceMap = ({ lat, lng, isLoaded, onLocationSelect }: WorkPlaceMapProps) => {
  return (
    <Suspense fallback={<Skeleton className="w-full h-48 rounded-md animate-pulse" />}>
      {isLoaded ? (
        <NaverMap onLocationSelect={onLocationSelect} selectedLocation={{ lat, lng }} />
      ) : (
        <Skeleton className="w-full h-48 rounded-md animate-pulse" />
      )}
    </Suspense>
  );
};

export default WorkPlaceMap;
