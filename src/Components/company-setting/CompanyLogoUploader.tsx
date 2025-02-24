import { useState } from "react";
import { Camera, ImageIcon } from "lucide-react";
import ImageModal from "@/components/modal/ImageModal";

interface CompanyLogoUploaderProps {
  imageUrl: string;
  companyCode: string;
  setImageUrl: (url: string) => void;
}

const CompanyLogoUploader = ({ imageUrl, companyCode, setImageUrl }: CompanyLogoUploaderProps) => {
  const [imageOpenModal, setImageOpenModal] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-600 text-sm mb-1 font-medium">회사 로고</p>
      <p className="text-xs text-gray-500 mb-3">(JPEG, JPG, PNG 형식만 지원됩니다.)</p>

      <div
        onClick={() => setImageOpenModal(true)}
        className="relative cursor-pointer w-28 h-28 border-4 border-gray-300 bg-gray-100 flex justify-center items-center rounded-full shadow-md transition-all hover:shadow-lg hover:bg-gray-200"
        role="button"
        aria-label="회사 로고 업로드"
      >
        {!imageUrl ? (
          <div className="flex flex-col items-center text-gray-500">
            <Camera className="w-8 h-8 mb-1" />
            <span className="text-sm">로고 업로드</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="로고 이미지"
            className="w-full h-full rounded-full object-cover"
          />
        )}

        {imageUrl && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {/* 이미지 업로드 모달 */}
      <ImageModal
        companyCode={companyCode}
        open={imageOpenModal}
        setImageUrl={setImageUrl}
        handleClose={() => setImageOpenModal(false)}
      />
    </div>
  );
};

export default CompanyLogoUploader;
