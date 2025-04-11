import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCompanyStore } from "@/store/company.store";
import OutWorkingModal from "@/components/common/modal/OutWorkingModal";
import { MapPin, MapPinOff, CheckCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";
import CommuteConfirmModal from "@/components/common/modal/CommuteConfirmModal";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DISTANCE_THRESHOLD = 3; // 실제로는 300m 기준

const getDistanceFromLatLng = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371e3;
  const toRad = (value: number) => (value * Math.PI) / 180;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lng2 - lng1);

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function CommutePage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<(typeof workPlacesList)[number][]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { workPlacesList } = useCompanyStore(
    useShallow(state => ({
      workPlacesList: state.currentCompany?.workPlacesList ?? [],
    })),
  );
  const { companyCode } = useParams();
  const selectedPlace = nearbyPlaces.find(p => p.id === selectedPlaceId);
  const { toast } = useToast();
  // 위치 요청
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("위치 권한을 허용해주세요.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        setError("위치 정보를 가져오는 데 실패했습니다. 권한을 허용했는지 확인해주세요.");
        setIsLoading(false);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  // 위치 기반 근무지 계산
  useEffect(() => {
    if (!userLocation) return;

    const placesWithDistance = workPlacesList.map(place => ({
      ...place,
      distance: getDistanceFromLatLng(userLocation.lat, userLocation.lng, place.lat, place.lng),
    }));

    const filtered = placesWithDistance
      .filter(p => p.distance <= DISTANCE_THRESHOLD)
      .sort((a, b) => a.distance - b.distance);

    setNearbyPlaces(filtered);

    if (filtered.length > 0) {
      setSelectedPlaceId(filtered[0].id); // 기본 선택
    }
  }, [userLocation, workPlacesList]);

  const handleCommute = () => {
    if (!selectedPlace) return;
    setIsConfirmOpen(true);
  };

  // --- UI 렌더링 --- //

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 py-32 text-center">
        <ClipLoader size={50} color="#FFD369" />
        <p className="text-sm text-muted-foreground">위치를 확인 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <MapPinOff className="h-10 w-10 text-red-500" />
        <p className="textFFD369-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12">
      {nearbyPlaces.length > 0 ? (
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <MapPin className="h-5 w-5" />
            <h2 className="text-lg font-semibold">근무지를 선택해주세요</h2>
          </div>

          {selectedPlace && (
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
              <WorkPlaceMap
                lat={selectedPlace.lat}
                lng={selectedPlace.lng}
                isLoaded={!isLoading}
                markerDragAble={false}
                onLocationSelect={() => {}}
              />
            </div>
          )}

          <div className="space-y-4">
            {nearbyPlaces.map(place => {
              const isSelected = selectedPlaceId === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlaceId(place.id)}
                  className={`relative w-full rounded-xl border px-5 py-4 text-left shadow-sm transition-all hover:shadow-md ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle className="absolute right-4 top-4 h-5 w-5 text-blue-500" />
                  )}
                  <p className="text-base font-bold text-gray-900">{place.name}</p>
                  <p className="text-sm text-gray-600">{place.address}</p>
                  {place.memo && (
                    <p className="mt-1 text-xs italic text-gray-400">“{place.memo}”</p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <Button
              disabled={!selectedPlaceId}
              className="w-full"
              onClick={handleCommute}
              variant={selectedPlaceId ? "default" : "secondary"}
            >
              출근하기
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-md space-y-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <MapPinOff className="h-10 w-10 text-red-500" />
            <p className="text-lg font-medium text-red-600">근처에 등록된 근무지가 없습니다.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              현재 위치에서 근무지를 확인할 수 없습니다. <br />
              다시 시도하거나 관리자에게 문의해주세요.
            </p>
          </div>
          <OutWorkingModal />
        </div>
      )}
      {selectedPlace && userLocation && (
        <CommuteConfirmModal
          open={isConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            setIsConfirmOpen(false);
            navigate(`/${companyCode}/companyMain`);
            toast({
              title: "출근이 성공적으로 완료되었습니다.",
            });
          }}
          place={selectedPlace}
        />
      )}
    </div>
  );
}
