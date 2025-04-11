import React, { useEffect } from "react";
interface INaverMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number };
  markerDragAble?: boolean;
}
const NaverMap = ({
  onLocationSelect,
  selectedLocation,
  markerDragAble = true,
}: INaverMapProps) => {
  useEffect(() => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng),
      zoom: 15,
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(selectedLocation.lat, selectedLocation.lng),
      map: map,
      draggable: markerDragAble,
    });

    //  마커 드래그 종료 시 이벤트 발생
    naver.maps.Event.addListener(marker, "dragend", function (e) {
      const lat = e.coord.y;
      const lng = e.coord.x;
      onLocationSelect(lat, lng); //  부모 상태 업데이트
    });

    return () => {
      naver.maps.Event.clearInstanceListeners(marker);
    };
  }, [selectedLocation]);

  return <div id="map" style={{ width: "100%", height: "300px" }} />;
};

export default NaverMap;
