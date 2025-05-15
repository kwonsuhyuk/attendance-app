export const hasSeenTour = (pageKey: string, uid: string) => {
  return localStorage.getItem(`${pageKey}_tour_seen_${uid}`) === "true";
};

export const markTourAsSeen = (pageKey: string, uid: string) => {
  localStorage.setItem(`${pageKey}_tour_seen_${uid}`, "true");
};
