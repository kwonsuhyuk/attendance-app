import { TWorkPlace } from "@/model/types/company.type";
import { getDistanceFromLatLng } from "@/util/latlng.util";
import { useEffect, useState } from "react";
import { useCompanyStore } from "@/store/company.store";

export const useNearbyWorkplaces = (
  location: { lat: number; lng: number } | null,
  workPlaces: TWorkPlace[],
) => {
  const [nearby, setNearby] = useState<TWorkPlace[]>([]);
  const { currentCompany } = useCompanyStore();

  useEffect(() => {
    if (!location || !currentCompany?.workPlacesList) return;

    const placesWithDistance = workPlaces.map(place => {
      const matched = currentCompany.workPlacesList.find(w => w.id === place.id);
      const radius = matched?.radius ?? 0;

      const distance = getDistanceFromLatLng(location.lat, location.lng, place.lat, place.lng);

      return {
        ...place,
        radius,
        distance,
      };
    });

    const filtered = placesWithDistance
      .filter(p => p.distance <= p.radius)
      .sort((a, b) => a.distance - b.distance);

    setNearby(filtered);
  }, [workPlaces, location, currentCompany]);

  return nearby;
};
