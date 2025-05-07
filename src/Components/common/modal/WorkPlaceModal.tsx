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
import { useState } from "react";

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
    isLocationLoaded,
    searchResults,
    isSearching,
    noResult,
    handleSearchAddress,
    handleSelectAddress,
  } = useWorkPlaceModal(place);

  const [radius, setRadius] = useState(5);
  const radiusOptions = [1, 3, 5, 10, 20];
  const [radiusIndex, setRadiusIndex] = useState(1);

  const handleAddPlace = () => {
    onSave({ name, memo, address, lat, lng, radius });
    onClose();
    setName("");
    setMemo("");
    setAddress("");
    setRadius(5);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto rounded-xl bg-white p-2 px-6 shadow-lg sm:max-h-[95vh] sm:max-w-md">
        <DialogHeader>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <DialogTitle className="text-lg font-medium">근무지 설정</DialogTitle>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:bg-white-card-bg hover:text-destructive hover:text-white-nav-selected"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>근무지 이름</Label>
            <Input
              placeholder="예: 강남 본사"
              className="h-10 placeholder:text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label>메모</Label>
            <Input
              placeholder="근무지에 대한 메모"
              className="h-10 placeholder:text-sm"
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
          </div>
          <div className="relative space-y-3">
            <Label>주소</Label>
            <div className="flex h-10 items-center space-x-2">
              <Input
                placeholder="도로명 주소를 입력하세요 (예: 기흥구 기흥로 116번길 10)"
                className="h-10 placeholder:text-xs sm:placeholder:text-sm"
                value={address}
                onChange={e => setAddress(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchAddress();
                  }
                }}
              />
              <Button onClick={handleSearchAddress} disabled={isSearching} className="h-10">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <SearchResults
              searchResults={searchResults}
              noResult={noResult}
              onSelect={handleSelectAddress}
            />
          </div>

          <div className="w-full space-y-2">
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
                onValueChange={([val]) => {
                  setRadiusIndex(val);
                  setRadius(radiusOptions[val] * 100);
                }}
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

          <div className="h-1" />

          <WorkPlaceMap
            lat={lat}
            lng={lng}
            isLoaded={isLocationLoaded}
            radius={radius}
            onLocationSelect={() => {}}
          />

          <Button onClick={handleAddPlace} disabled={!name || !address} className="w-full">
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkPlaceModal;
