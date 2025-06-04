import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MapPin, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TWorkPlace } from "@/model/types/company.type";
import { useWorkPlaceModal } from "@/hooks/company-settings/useWorkPlaceModal";
import SearchResults from "@/components/company/company-settings/workplace-setting/SearchResults";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";
import { useEffect, useState } from "react";
import RegisterModal from "./commonModalLayout/RegisterModal";

interface WorkPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workPlace: Omit<TWorkPlace, "id">) => void;
  place?: TWorkPlace;
}

const WorkPlaceModal = ({ isOpen, onClose, onSave, place }: WorkPlaceModalProps) => {
  const {
    name,
    setName,
    memo,
    setMemo,
    address,
    setAddress,
    lat,
    lng,
    setLat,
    openPostcodePopup,
    setLng,
    isLocationLoaded,
  } = useWorkPlaceModal(place);

  const radiusOptions = [1, 3, 5, 10, 20];
  const [radiusIndex, setRadiusIndex] = useState(1);

  const radius = radiusOptions[radiusIndex] * 100;

  useEffect(() => {
    if (place) {
      const index = radiusOptions.findIndex(v => v * 100 === place.radius);
      if (index !== -1) {
        setRadiusIndex(index);
      }
    }
  }, [place]);

  const handleAddPlace = () => {
    onSave({ name, memo, address, lat, lng, radius });
    onClose();
    setName("");
    setMemo("");
    setAddress("");
    setRadiusIndex(1);
  };

  return (
    <RegisterModal
      open={isOpen}
      onClose={onClose}
      title="근무지 설정"
      icon={<MapPin className="h-5 w-5" />}
      onSubmit={handleAddPlace}
      submitLabel="저장"
      submitDisabled={!name.trim() || !address.trim()}
      titleAlign="left"
    >
      {/* 근무지 이름 */}
      <div className="space-y-2">
        <Label>근무지 이름</Label>
        <Input
          placeholder="예: 강남 본사"
          className="h-10 placeholder:text-sm"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* 메모 */}
      <div className="space-y-2">
        <Label>메모</Label>
        <Input
          placeholder="근무지에 대한 메모"
          className="h-10 placeholder:text-sm"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />
      </div>

      {/* 주소 */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">주소</Label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {address && (
            <Input
              className="h-10 w-full flex-1 truncate bg-gray-100 text-sm dark:bg-zinc-800"
              value={address}
              readOnly
            />
          )}
          <Button
            type="button"
            onClick={openPostcodePopup}
            className="h-10 whitespace-nowrap px-3 text-sm"
            variant="outline"
          >
            주소 검색
          </Button>
        </div>
      </div>

      {/* 반경 슬라이더 */}
      <div className="mb-4 w-full space-y-3">
        <div className="flex items-center gap-3">
          <Label>반경 (100m 단위)</Label>
          <p className="text-xs text-gray-500">※ 10 = 1km</p>
        </div>
        <div className="relative w-full">
          <Slider
            min={0}
            max={radiusOptions.length - 1}
            step={1}
            value={[radiusIndex]}
            onValueChange={([val]) => setRadiusIndex(val)}
            className="w-full"
          />
          <div className="pointer-events-none absolute left-0 top-full mt-2 w-full px-2">
            <div className="relative">
              {radiusOptions.map((v, i) => (
                <span
                  key={i}
                  className="absolute top-0 -translate-x-1/2 text-base text-muted-foreground"
                  style={{ left: `${(i / (radiusOptions.length - 1)) * 100}%` }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WorkPlaceMap
        lat={lat}
        lng={lng}
        isLoaded={isLocationLoaded}
        radius={radius}
        onLocationSelect={(newLat, newLng) => {
          setLat(newLat);
          setLng(newLng);
        }}
      />
    </RegisterModal>
  );
};

export default WorkPlaceModal;
