import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import { useCommuteStatus } from "@/hooks/employee/useCommuteStatus";
import OutWorkingModal from "@/components/common/modal/OutWorkingModal";
import CommuteConfirmModal from "@/components/common/modal/CommuteConfirmModal";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";
import { useMemo, useState } from "react";
import { useUserLocation } from "@/hooks/employee/useUserLocation";
import { useNearbyWorkplaces } from "@/hooks/employee/useNearbyWorkplaces";
import CommuteLoading from "@/components/common/CommuteLoading";
import CommuteError from "@/components/common/CommuteError";
import { useCommuteModal } from "@/hooks/employee/useCommuteModal";
import CommuteNotFound from "@/components/employee/mainpageBox/CommuteNotFound";
import {
  CommuteButton,
  CommuteHeader,
  CommutePlaceList,
} from "@/components/employee/mainpageBox/CommutePageUI";
import { useDefaultSelectedPlace } from "@/hooks/employee/useDefaultSelectedPlace";

export default function CommutePage() {
  const { companyCode } = useParams();
  const userId = useUserStore(state => state.currentUser?.uid);
  const { workPlacesList } = useCompanyStore(
    useShallow(state => ({
      workPlacesList: state.currentCompany?.workPlacesList ?? [],
    })),
  );
  const { location: userLocation, isLoading, error } = useUserLocation();
  const nearbyPlaces = useNearbyWorkplaces(userLocation, workPlacesList);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const selectedPlace = useMemo(
    () => nearbyPlaces.find(p => p.id === selectedPlaceId),
    [selectedPlaceId, nearbyPlaces],
  );
  const { status } = useCommuteStatus(companyCode, userId);
  const isCheckoutMode = status === "checked-in-only";
  const { isConfirmOpen, setIsConfirmOpen, handleCommuteModal, handleConfirmCommute } =
    useCommuteModal({
      userLocation,
      selectedPlace,
      userId,
      status,
    });
  useDefaultSelectedPlace(nearbyPlaces, setSelectedPlaceId);

  if (isLoading) return <CommuteLoading />;

  if (error) return <CommuteError error={error} />;

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12">
      {nearbyPlaces.length > 0 ? (
        <div className="w-full max-w-md space-y-6">
          <CommuteHeader isCheckoutMode={isCheckoutMode} />
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
          <CommutePlaceList
            places={nearbyPlaces}
            selectedPlaceId={selectedPlaceId}
            onSelect={setSelectedPlaceId}
          />
          <CommuteButton
            isCheckoutMode={isCheckoutMode}
            disabled={!selectedPlaceId}
            onClick={handleCommuteModal}
          />
        </div>
      ) : (
        <CommuteNotFound />
      )}
      {status && <OutWorkingModal isCheckout={isCheckoutMode} status={status} />}
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
