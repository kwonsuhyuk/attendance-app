import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IKakaoMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number };
  markerDragAble?: boolean;
  radius?: number;
}

const KakaoMap = ({
  onLocationSelect,
  selectedLocation,
  markerDragAble = true,
  radius = 300,
}: IKakaoMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  const getZoomByRadius = (radius: number) => {
    if (radius <= 100) return 4;
    if (radius <= 300) return 5;
    if (radius <= 500) return 6;
    if (radius <= 1000) return 7;
    return 8;
  };

  useEffect(() => {
    const loadMap = async () => {
      if (!window.kakao || !window.kakao.maps) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false`;
          script.async = true;
          script.onload = () => {
            window.kakao.maps.load(resolve);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const kakao = window.kakao;
      const center = new kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
      const zoom = getZoomByRadius(radius);

      if (!mapRef.current && containerRef.current) {
        const map = new kakao.maps.Map(containerRef.current, {
          center,
          level: zoom,
        });

        const marker = new kakao.maps.Marker({
          map,
          position: center,
          draggable: markerDragAble,
        });

        mapRef.current = map;
        markerRef.current = marker;

        kakao.maps.event.addListener(marker, "dragend", function () {
          const pos = marker.getPosition();
          onLocationSelect(pos.getLat(), pos.getLng());
          map.setCenter(pos);
          circleRef.current?.setPosition(pos);
        });

        const circle = new kakao.maps.Circle({
          map,
          center,
          radius,
          strokeWeight: 1,
          strokeColor: "#3B82F6",
          strokeOpacity: 0.8,
          fillColor: "#93C5FD",
          fillOpacity: 0.3,
        });

        circleRef.current = circle;
      } else {
        const map = mapRef.current;
        const marker = markerRef.current;
        const newCenter = center;

        marker.setPosition(newCenter);
        map.setCenter(newCenter);
        map.setLevel(zoom);

        if (circleRef.current) circleRef.current.setMap(null);

        const newCircle = new kakao.maps.Circle({
          map,
          center: newCenter,
          radius,
          strokeWeight: 1,
          strokeColor: "#3B82F6",
          strokeOpacity: 0.8,
          fillColor: "#93C5FD",
          fillOpacity: 0.3,
        });

        circleRef.current = newCircle;
      }
    };

    loadMap();
  }, [selectedLocation, radius]);

  return <div ref={containerRef} style={{ width: "100%", height: "300px" }} />;
};

export default KakaoMap;
