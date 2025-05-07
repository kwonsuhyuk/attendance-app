import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <ClipLoader color="#000000" size={60} />
      <p className="mt-4 animate-pulse text-base text-gray-700">On&Off 로딩 중입니다...</p>
    </div>
  );
}
