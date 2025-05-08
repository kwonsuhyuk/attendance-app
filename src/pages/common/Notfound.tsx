import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <h1 className="mb-4 text-6xl font-bold">On&Off</h1>
      <p className="mb-8 text-xl">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-end gap-2 rounded-xl bg-white px-6 py-2 text-black transition hover:bg-gray-100"
      >
        <ArrowLeft /> 뒤로가기
      </button>
    </div>
  );
}

export default Notfound;
