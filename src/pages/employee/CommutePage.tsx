import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCompanyStore } from "@/store/company.store";
import OutWorkingModal from "@/components/common/modal/OutWorkingModal";
import { MapPin, MapPinOff, CheckCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";
import CommuteConfirmModal from "@/components/common/modal/CommuteConfirmModal";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { processCommute } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useCommuteStatus } from "@/hooks/employee/useCommuteStatus";
import { TWorkPlace } from "@/model/types/company.type";
import { getDistanceFromLatLng } from "@/util/latlng.util";
import { DISTANCE_THRESHOLD } from "@/constants/distance";

export default function CommutePage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<TWorkPlace[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { companyCode } = useParams();
  const userId = useUserStore(state => state.currentUser?.uid);

  const { workPlacesList } = useCompanyStore(
    useShallow(state => ({ workPlacesList: state.currentCompany?.workPlacesList ?? [] })),
  );

  const selectedPlace = nearbyPlaces.find(p => p.id === selectedPlaceId);

  const { status } = useCommuteStatus(companyCode, userId);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("위치 권한을 허용해주세요.");
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsLoading(false);
      },
      () => {
        setError("위치 정보를 가져오는 데 실패했습니다. 권한을 허용했는지 확인해주세요.");
        setIsLoading(false);
      },
      { enableHighAccuracy: true },
    );
  }, []);

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
    if (filtered.length > 0) setSelectedPlaceId(filtered[0].id);
  }, [userLocation, workPlacesList]);

  const handleCommute = () => {
    if (!selectedPlace) return;
    setIsConfirmOpen(true);
  };

  const handleConfirmCommute = async () => {
    if (!selectedPlace || !userLocation || !companyCode || !userId || !status) return;
    const scanTime = new Date().toISOString();
    const res = await processCommute(status, companyCode, userId, scanTime, selectedPlace.id);
    setIsConfirmOpen(false);
    if (res.success) {
      toast({
        title: `${status === "checked-in-only" ? "퇴근" : "출근"}이 성공적으로 완료되었습니다.`,
      });
      navigate(`/${companyCode}/companyMain`);
    } else {
      toast({ title: res.error || "처리 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

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
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  const isCheckoutMode = status === "checked-in-only";

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12">
      {nearbyPlaces.length > 0 ? (
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-300">
            <MapPin className="h-5 w-5" />
            <h2 className="text-lg font-semibold">
              {isCheckoutMode ? "퇴근하실 근무지를 선택해주세요" : "출근하실 근무지를 선택해주세요"}
            </h2>
          </div>

          {selectedPlace && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
                  className={`relative w-full rounded-xl border px-5 py-4 text-left transition-all duration-200 ease-in-out ${
                    isSelected
                      ? "dark:bg-dark-accent border-blue-500 bg-blue-50 shadow-md dark:border-blue-400"
                      : "dark:hover:bg-dark-hover border-gray-200 bg-white-card-bg hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm dark:border-gray-700 dark:bg-dark-card-bg dark:hover:border-blue-400"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle className="absolute right-4 top-4 h-5 w-5 text-blue-500 dark:text-blue-400" />
                  )}
                  <p
                    className={`text-base font-semibold ${
                      isSelected ? "text-gray-900 dark:text-black" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {place.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{place.address}</p>
                  {place.memo && (
                    <p className="mt-1 text-xs italic text-gray-400 dark:text-gray-500">
                      “{place.memo}”
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <Button
            disabled={!selectedPlaceId}
            className={`w-full ${!selectedPlaceId ? "bg-muted text-muted-foreground" : ""}`}
            onClick={handleCommute}
            variant={selectedPlaceId ? "default" : "secondary"}
          >
            {isCheckoutMode ? "퇴근하기" : "출근하기"}
          </Button>
        </div>
      ) : (
        <div className="max-w-md space-y-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <MapPinOff className="h-10 w-10 text-red-600 dark:text-red-400" />
            <p className="text-lg font-medium text-red-600 dark:text-red-400">
              근처에 등록된 근무지가 없습니다.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              현재 위치를 기준으로 근처 근무지를 확인할 수 없습니다. <br />
              위치 접근 권한이 허용되어 있는지 확인해 주세요. <br />
              문제가 지속된다면 관리자에게 문의해 주세요.
            </p>
          </div>
        </div>
      )}
      {userLocation && status && (
        <OutWorkingModal isCheckout={status === "checked-in-only"} status={status} />
      )}
      {selectedPlace && (
        <CommuteConfirmModal
          open={isConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmCommute}
          place={selectedPlace}
          isCheckoutMode={isCheckoutMode}
        />
      )}
    </div>
  );
}
