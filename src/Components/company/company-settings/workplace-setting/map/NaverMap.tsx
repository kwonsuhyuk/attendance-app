import React, { useEffect, useRef } from "react";

interface INaverMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number };
  markerDragAble?: boolean;
  radius?: number; // 단위: m
  isLoaded?: boolean;
}

const NaverMap = ({
  onLocationSelect,
  selectedLocation,
  markerDragAble = true,
  radius = 300, // 기본 300m (단위: m)
}: INaverMapProps) => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const circleRef = useRef<naver.maps.Circle | null>(null);

  const getZoomByRadius = (radius: number) => {
    if (radius <= 100) return 17;
    if (radius <= 300) return 15;
    if (radius <= 500) return 15;
    if (radius <= 1000) return 14;
    return 13;
  };

  useEffect(() => {
    const center = new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
    const zoom = getZoomByRadius(radius);

    if (!mapRef.current) {
      const map = new naver.maps.Map("map", { center, zoom });
      const marker = new naver.maps.Marker({
        position: center,
        map,
        draggable: markerDragAble,
      });

      mapRef.current = map;
      markerRef.current = marker;

      naver.maps.Event.addListener(marker, "dragend", e => {
        const lat = e.coord.y;
        const lng = e.coord.x;
        const newPos = new naver.maps.LatLng(lat, lng);
        marker.setPosition(newPos);
        circleRef.current?.setCenter(newPos);
        map.setCenter(newPos);
        onLocationSelect(lat, lng);
      });

      // ✅ idle 이후 원 생성 (기존 원 제거 후)
      naver.maps.Event.once(map, "idle", () => {
        if (circleRef.current) {
          circleRef.current.setMap(null);
        }

        const circle = new naver.maps.Circle({
          map,
          center,
          radius,
          strokeColor: "#3B82F6",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#93C5FD",
          fillOpacity: 0.3,
        });

        circleRef.current = circle;
      });

      setTimeout(() => {
        naver.maps.Event.trigger(map, "resize");
      }, 300);
    } else {
      const map = mapRef.current!;
      const marker = markerRef.current!;
      const newCenter = center;

      marker.setPosition(newCenter);
      map.setCenter(newCenter);
      map.setZoom(zoom);

      // ✅ 반경 변경 시 기존 원 제거 후 다시 생성
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      const newCircle = new naver.maps.Circle({
        map,
        center: newCenter,
        radius,
        strokeColor: "#3B82F6",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#93C5FD",
        fillOpacity: 0.3,
      });

      circleRef.current = newCircle;
    }
  }, [selectedLocation, radius]);

  return <div id="map" style={{ width: "100%", height: "300px" }} />;
};

export default NaverMap;
