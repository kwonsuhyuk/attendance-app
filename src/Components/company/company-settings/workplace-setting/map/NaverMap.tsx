import React, { useEffect, useRef } from "react";

interface INaverMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number };
  markerDragAble?: boolean;
  radius?: number; // ✅ 반경 추가
  isLoaded?: boolean;
}

const NaverMap = ({
  onLocationSelect,
  selectedLocation,
  markerDragAble = true,
  radius = 3, // 기본 300m
}: INaverMapProps) => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const circleRef = useRef<naver.maps.Circle | null>(null);

  const getZoomByRadius = (radius: number) => {
    if (radius <= 100) return 17; // 눈금: 50m
    if (radius <= 300) return 15; // 눈금: 300m
    if (radius <= 500) return 15; // 눈금: 300m
    if (radius <= 1000) return 14; // 눈금: 500m
    return 13; // radius <= 2000, 눈금: 1000m
  };

  useEffect(() => {
    if (!mapRef.current) {
      const center = new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
      const zoom = getZoomByRadius(radius);

      const map = new naver.maps.Map("map", {
        center,
        zoom,
      });

      const marker = new naver.maps.Marker({
        position: center,
        map,
        draggable: markerDragAble,
      });

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

      mapRef.current = map;
      markerRef.current = marker;
      circleRef.current = circle;

      naver.maps.Event.addListener(marker, "dragend", function (e) {
        const lat = e.coord.y;
        const lng = e.coord.x;
        const newPos = new naver.maps.LatLng(lat, lng);
        marker.setPosition(newPos);
        circle.setCenter(newPos);
        map.setCenter(newPos);
        onLocationSelect(lat, lng);
      });

      // 지도 리사이즈 트리거
      setTimeout(() => {
        naver.maps.Event.trigger(map, "resize");
      }, 200);
    } else {
      // center, circle, radius만 업데이트
      const map = mapRef.current;
      const marker = markerRef.current;
      const circle = circleRef.current;
      const newCenter = new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng);

      marker?.setPosition(newCenter);
      circle?.setCenter(newCenter);
      circle?.setRadius(radius);
      map?.setCenter(newCenter);
      map?.setZoom(getZoomByRadius(radius));
    }
  }, [selectedLocation, radius]);

  return <div id="map" style={{ width: "100%", height: "300px" }} />;
};

export default NaverMap;
