import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("위치 권한을 허용해주세요.");
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsLoading(false);
      },
      () => {
        setError("위치 정보를 가져오는 데 실패했습니다.");
        setIsLoading(false);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  return { location, error, isLoading };
};
