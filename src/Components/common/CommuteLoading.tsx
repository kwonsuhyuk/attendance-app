import React from "react";
import { ClipLoader } from "react-spinners";

const CommuteLoading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-32 text-center">
      <ClipLoader size={50} color="#FFD369" />
      <p className="text-sm text-muted-foreground">위치를 확인 중입니다...</p>
    </div>
  );
};

export default CommuteLoading;
