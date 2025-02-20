import React, { lazy, Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const NaverMap = lazy(() => import("../map/NaverMap"));

interface IWorkPlace {
  name: string;
  memo: string;
  address: string;
  lat: number;
  lng: number;
}

interface WorkPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workPlace: IWorkPlace) => void;
}

const WorkPlaceModal = ({ isOpen, onClose, onSave }: WorkPlaceModalProps) => {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(37.5665);
  const [lng, setLng] = useState(126.978);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { address: string; lat: number; lng: number }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResult, setNoResult] = useState(false);

  // ✅ 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocationLoaded(true); // 위치 가져오기 완료 시 지도 표시
        },
        error => {
          console.error("위치 가져오기 실패:", error);
          setIsLocationLoaded(true); // 위치 거부 시 지도 표시
        },
      );
    } else {
      setIsLocationLoaded(true); // 위치 지원 안하는 경우 지도 표시
    }
  }, []);

  useEffect(() => {
    setNoResult(false);
    setSearchResults([]);
  }, [address]);

  // ✅ 주소 검색 요청
  const handleSearchAddress = async () => {
    if (!address.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/naver-geocode?query=${encodeURIComponent(address)}`, {
        method: "GET",
        headers: {
          "X-NCP-APIGW-API-KEY-ID": import.meta.env.VITE_NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": import.meta.env.VITE_NAVER_CLIENT_SECRET,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.addresses.length === 0) {
        setNoResult(true);
      }
      if (data.addresses) {
        setSearchResults(
          data.addresses.map((addr: any) => ({
            address: addr.roadAddress || addr.jibunAddress,
            lat: parseFloat(addr.y),
            lng: parseFloat(addr.x),
          })),
        );
      }
    } catch (error) {
      console.error("주소 검색 오류:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // ✅ 주소 선택 시 업데이트
  const handleSelectAddress = (
    selectedAddress: string,
    selectedLat: number,
    selectedLng: number,
  ) => {
    setAddress(selectedAddress);
    setLat(selectedLat);
    setLng(selectedLng);
    setAddress(selectedAddress);
    setSearchResults([]);
  };

  // ✅ 지도에서 마커 이동 시 업데이트
  const handleMarkerDragEnd = (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  };

  // ✅ 근무지 추가 핸들러
  const handleAddPlace = () => {
    onSave({ name, memo, address, lat, lng });
    onClose();
    setName("");
    setMemo("");
    setAddress("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            근무지 추가
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
            <div className="flex items-center space-x-2 h-12">
              <Input
                placeholder="도로명 주소를 입력하세요 (예: 기흥구 기흥로 116번길 10)"
                className="h-12 placeholder:text-sm"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <Button onClick={handleSearchAddress} disabled={isSearching} className="h-12">
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* ✅ 검색 결과 absolute로 띄우기 */}
            {searchResults.length > 0 ? (
              <div className="absolute top-full left-0 w-full border rounded-md bg-white shadow-md max-h-40 overflow-y-auto mt-1 z-50">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2"
                    onClick={() => handleSelectAddress(result.address, result.lat, result.lng)}
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{result.address}</span>
                  </div>
                ))}
              </div>
            ) : (
              address.trim() &&
              noResult && (
                <div className="absolute top-full left-0 w-full border rounded-md bg-white shadow-md text-gray-500 text-sm text-center p-2 mt-1 z-50">
                  검색 결과가 없습니다. 정확한 주소를 입력해주세요.
                </div>
              )
            )}
          </div>

          <p className="text-xs text-gray-400">
            좌표: ({lat}, {lng})
          </p>

          {/* ✅ 위치를 가져오는 동안 Skeleton을 표시하고, 로딩 완료 후 지도 표시 */}
          <Suspense
            fallback={
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="w-full h-48 rounded-md" />
                <p className="text-gray-500 text-sm">지도 불러오는 중...</p>
              </div>
            }
          >
            {isLocationLoaded ? (
              <NaverMap onLocationSelect={handleMarkerDragEnd} selectedLocation={{ lat, lng }} />
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="w-full h-48 rounded-md" />
                <p className="text-gray-500 text-sm">위치 정보를 불러오는 중...</p>
              </div>
            )}
          </Suspense>

          <Button onClick={handleAddPlace} disabled={!name || !address} className="w-full">
            추가하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkPlaceModal;
