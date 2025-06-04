import { fetchAddressByKakao } from "@/api/map.api";
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocationLoaded(true);
        },
        error => {
          setLat(37.5665); // 기본값: 서울
          setLng(126.978);
          setIsLocationLoaded(true);
        },
        { enableHighAccuracy: true },
      );
    } else {
      console.warn("⚠️ 이 브라우저는 Geolocation을 지원하지 않습니다.");
      setLat(37.5665);
      setLng(126.978);
      setIsLocationLoaded(true);
    }
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
    const response = await fetchAddressByKakao(address);

    if (response.data) {
      const docs = response.data.documents;

      if (!docs || docs.length === 0) {
        setNoResult(true);
      }

      setSearchResults(
        docs.map((doc: any) => ({
          address: doc.road_address?.address_name || doc.address?.address_name,
          lat: parseFloat(doc.y),
          lng: parseFloat(doc.x),
        })),
      );
    }

    setIsSearching(false);
  };

  // 다음 우편번호 팝업
  const openPostcodePopup = () => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: async data => {
          const fullAddress = data.roadAddress || data.jibunAddress;

          if (fullAddress) {
            setAddress(fullAddress);

            // 좌표 변환 요청
            try {
              const response = await fetchAddressByKakao(fullAddress);
              const docs = response.data?.documents;

              if (docs && docs.length > 0) {
                const first = docs[0];
                setLat(parseFloat(first.y));
                setLng(parseFloat(first.x));
              }
            } catch (err) {
              console.error("좌표 변환 실패:", err);
            }
          }
        },
      }).open();
    };

    document.body.appendChild(script);
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

  // place가 있을 경우 초기값 세팅
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
      setLat(37.5665);
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
    setLat,
    setLng,
    isLocationLoaded,
    searchResults,
    setSearchResults,
    isSearching,
    noResult,
    handleSearchAddress,
    handleSelectAddress,
    openPostcodePopup,
  };
};
