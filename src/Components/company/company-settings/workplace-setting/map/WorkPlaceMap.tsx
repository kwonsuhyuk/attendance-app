import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const NaverMap = lazy(() => import("./NaverMap"));

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
