export async function fetchAddressByNaver(address: string) {
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
    return {
      success: true,
      data: { addresses: data.addresses },
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}
