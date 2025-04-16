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
  radius = 300, // 기본 300m
}: INaverMapProps) => {
  useEffect(() => {
    const center = new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng);

    const map = new naver.maps.Map("map", {
      center,
      zoom: 15,
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
      strokeColor: "#3B82F6", // 파란색 (Tailwind blue-500 기준)
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#93C5FD", // 연한 파란색 (Tailwind blue-300 기준)
      fillOpacity: 0.3,
    });

    // 마커 드래그 종료 시 원도 이동 + 부모에 위치 전달
    naver.maps.Event.addListener(marker, "dragend", function (e) {
      const lat = e.coord.y;
      const lng = e.coord.x;
      const newPosition = new naver.maps.LatLng(lat, lng);

      marker.setPosition(newPosition);
      circle.setCenter(newPosition); // ✅ 원 중심도 같이 이동
      onLocationSelect(lat, lng);
    });

    return () => {
      naver.maps.Event.clearInstanceListeners(marker);
      circle.setMap(null);
      marker.setMap(null);
    };
  }, [selectedLocation]);

  return <div id="map" style={{ width: "100%", height: "300px" }} />;
};

export default NaverMap;
