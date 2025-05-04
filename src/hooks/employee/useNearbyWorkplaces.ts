import { DISTANCE_THRESHOLD } from "@/constants/distance";
import { TWorkPlace } from "@/model/types/company.type";
import { getDistanceFromLatLng } from "@/util/latlng.util";
import { useEffect, useState } from "react";

export const useNearbyWorkplaces = (
  location: { lat: number; lng: number } | null,
  workPlaces: TWorkPlace[],
) => {
  const [nearby, setNearby] = useState<TWorkPlace[]>([]);

  useEffect(() => {
    if (!location) return;
    const placesWithDistance = workPlaces.map(place => ({
      ...place,
      distance: getDistanceFromLatLng(location.lat, location.lng, place.lat, place.lng),
    }));

    const filtered = placesWithDistance
      .filter(p => p.distance <= DISTANCE_THRESHOLD)
      .sort((a, b) => a.distance - b.distance);

    setNearby(filtered);
  }, [location, workPlaces]);

  return nearby;
};
