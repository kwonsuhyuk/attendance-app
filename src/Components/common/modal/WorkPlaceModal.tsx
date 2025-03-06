import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MapPin } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { TWorkPlace } from "@/model/types/company.type";
import { useWorkPlaceModal } from "@/hooks/company-settings/useWorkPlaceModal";
import SearchResults from "@/components/company/company-settings/workplace-setting/SearchResults";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";

interface WorkPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workPlace: Omit<TWorkPlace, "id">) => void;
  place?: TWorkPlace;
}

const WorkPlaceModal = ({ isOpen, onClose, onSave }: WorkPlaceModalProps) => {
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
  } = useWorkPlaceModal();

  const handleAddPlace = () => {
    onSave({ name, memo, address, lat, lng });
    onClose();
    setName("");
    setMemo("");
    setAddress("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="mb-3">
            <MapPin className="mr-2 h-4 w-4" />
            근무지 설정
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>근무지 이름</Label>
            <Input
              placeholder="예: 강남 본사"
              className="h-12 placeholder:text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label>메모</Label>
            <Input
              placeholder="근무지에 대한 메모"
              className="h-12 placeholder:text-sm"
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
          </div>
          <div className="relative space-y-3">
            <Label>주소</Label>
            <div className="flex h-12 items-center space-x-2">
              <Input
                placeholder="도로명 주소를 입력하세요 (예: 기흥구 기흥로 116번길 10)"
                className="h-12 placeholder:text-sm"
                value={address}
                onChange={e => setAddress(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchAddress();
                  }
                }}
              />
              <Button onClick={handleSearchAddress} disabled={isSearching} className="h-12">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <SearchResults
              searchResults={searchResults}
              noResult={noResult}
              onSelect={handleSelectAddress}
            />
          </div>
          <WorkPlaceMap
            lat={lat}
            lng={lng}
            isLoaded={isLocationLoaded}
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
