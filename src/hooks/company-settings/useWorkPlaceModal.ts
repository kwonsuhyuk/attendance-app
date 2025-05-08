// import { PlaceCard } from './../../Components/company/attendance/DaliyAttendanceUI';
import { fetchAddressByNaver } from "@/api/map.api";
import { TWorkPlace } from "@/model/types/company.type";
import { useState, useEffect } from "react";

export interface IWorkPlace {
  name: string;
  memo: string;
  address: string;
  lat: number;
  lng: number;
}

export const useWorkPlaceModal = (place?: TWorkPlace) => {
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

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => setIsLocationLoaded(true),
        { enableHighAccuracy: true },
      );
    }
    setIsLocationLoaded(true);
  }, []);

  useEffect(() => {
    setNoResult(false);
    setSearchResults([]);
  }, [address]);

  // 주소 검색 요청
  const handleSearchAddress = async () => {
    if (!address.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const response = await fetchAddressByNaver(address);
    if (response.data) {
      if (response.data.addresses.length === 0) {
        setNoResult(true);
      }
      if (response.data.addresses) {
        setSearchResults(
          response.data.addresses.map((addr: any) => ({
            address: addr.roadAddress || addr.jibunAddress,
            lat: parseFloat(addr.y),
            lng: parseFloat(addr.x),
          })),
        );
      }
    }
    setIsSearching(false);
  };

  // 주소 선택 시 업데이트
  const handleSelectAddress = (
    selectedAddress: string,
    selectedLat: number,
    selectedLng: number,
  ) => {
    setAddress(selectedAddress);
    setLat(selectedLat);
    setLng(selectedLng);
    setSearchResults([]);
  };

  useEffect(() => {
    if (place) {
      setName(place.name);
      setMemo(place.memo);
      setAddress(place.address);
      setLat(place.lat);
      setLng(place.lng);
    } else {
      setName("");
      setMemo("");
      setAddress("");
      setLat(37.5665); // 기본값
      setLng(126.978);
    }
  }, [place]);

  return {
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
  };
};
