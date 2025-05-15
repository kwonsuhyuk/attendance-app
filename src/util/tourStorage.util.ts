// 계정 한정 특정 페이지의 처음 투어를 본 적이 있는지 확인하는 함수
export const hasSeenTour = (pageKey: string, uid: string) => {
  return localStorage.getItem(`${pageKey}_tour_seen_${uid}`) === "true";
};

// 해당 페이지의 투어를 처음 봤을 때 호출
export const markTourAsSeen = (pageKey: string, uid: string) => {
  localStorage.setItem(`${pageKey}_tour_seen_${uid}`, "true");
};
