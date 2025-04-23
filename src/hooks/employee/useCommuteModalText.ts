export const useCommuteModalText = (isCheckoutMode: boolean) => {
  return {
    actionText: isCheckoutMode ? "퇴근" : "출근",
    timeLabel: isCheckoutMode ? "퇴근 시간" : "출근 시간",
    confirmButtonColor: isCheckoutMode
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-green-500 hover:bg-green-600",
    warningText: isCheckoutMode
      ? "⚠️ 퇴근 후에는 수정이 어렵습니다."
      : "⚠️ 출근 후에는 취소할 수 없습니다.",
  };
};
