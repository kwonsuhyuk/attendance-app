import { TWorkPlace } from "@/model/types/company.type";
import { useEffect } from "react";

// hooks/employee/useDefaultSelectedPlace.ts
export const useDefaultSelectedPlace = (
  nearbyPlaces: TWorkPlace[],
  setSelectedPlaceId: (id: string) => void,
) => {
  useEffect(() => {
    if (nearbyPlaces.length > 0) {
      setSelectedPlaceId(nearbyPlaces[0].id);
    }
  }, [nearbyPlaces, setSelectedPlaceId]);
};
