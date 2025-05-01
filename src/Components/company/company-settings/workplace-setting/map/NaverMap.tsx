import React, { useEffect } from "react";

interface INaverMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number };
  markerDragAble?: boolean;
  radius?: number; // ✅ 반경 추가
}

const NaverMap = ({
  onLocationSelect,
  selectedLocation,
  markerDragAble = true,
  radius = 3, // 기본 300m
}: INaverMapProps) => {
  const getZoomByRadius = (radius: number) => {
    if (radius <= 100) return 16.5; // 눈금: 50m
    if (radius <= 300) return 15; // 눈금: 300m
    if (radius <= 500) return 15; // 눈금: 300m
    if (radius <= 1000) return 14; // 눈금: 500m
    return 13; // radius <= 2000, 눈금: 1000m
  };

  useEffect(() => {
    if (!radius || radius <= 0) return;
    const center = new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng);

    const zoom = getZoomByRadius(radius); // ✅ 반경에 따른 줌 계산

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
      radius, // 단위: 미터
      strokeColor: "#3B82F6",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#93C5FD",
      fillOpacity: 0.3,
    });

    naver.maps.Event.addListener(marker, "dragend", function (e) {
      const lat = e.coord.y;
      const lng = e.coord.x;
      const newPosition = new naver.maps.LatLng(lat, lng);
      marker.setPosition(newPosition);
      circle.setCenter(newPosition);
      map.setCenter(newPosition);
      onLocationSelect(lat, lng);
    });

    return () => {
      naver.maps.Event.clearInstanceListeners(marker);
      circle.setMap(null);
      marker.setMap(null);
      map.destroy();
    };
  }, [selectedLocation, radius]);

  return <div id="map" style={{ width: "100%", height: "300px" }} />;
};

export default NaverMap;
