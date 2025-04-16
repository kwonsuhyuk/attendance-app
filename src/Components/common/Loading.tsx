import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl bg-white px-8 py-6 shadow-lg">
      <ClipLoader color="black" size={80} aria-label="Loading Spinner" data-testid="loader" />
      <h3 className="mt-4 text-lg font-semibold text-gray-800">로딩 중 입니다.</h3>
    </div>
  );
}
