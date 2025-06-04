export async function fetchAddressByKakao(address: string) {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`, // ✅ 정확한 키 이름 사용
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "주소 요청 실패");
    }

    const data = await response.json();

    return {
      success: true,
      data: { documents: data.documents },
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}
