import { ClipLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <ClipLoader color="black" size={100} aria-label="Loading Spinner" data-testid="loader" />
      <h3>로딩 중 입니다.</h3>
    </div>
  );
};
