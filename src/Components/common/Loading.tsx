import { ClipLoader } from "react-spinners";

export function AppStartLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src="/favicon/android-chrome-192x192.png"
        alt="On&Off 로고"
        width={128}
        height={128}
        className="animate-zoom-fade"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md">
      <ClipLoader color="#000000" size={60} />
      <p className="mt-4 animate-pulse text-base text-gray-700">On&Off 로딩 중입니다...</p>
    </div>
  );
}
