import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <AlertCircle className="mb-6 h-12 w-12 text-red-500" />
      <h1 className="mb-4 text-5xl font-bold">에러 발생</h1>
      <p className="mb-8 text-lg">요청하신 작업 중 문제가 발생했습니다.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-xl bg-white px-6 py-2 text-black transition hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" /> 돌아가기
      </button>
    </div>
  );
};

export default ErrorPage;
