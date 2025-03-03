import { useState } from "react";
import { Camera, ImageIcon } from "lucide-react";
import ImageModal from "@/components/common/modal/ImageModal";

interface CompanyLogoUploaderProps {
  imageUrl: string;
  companyCode: string;
  setImageUrl: (url: string) => void;
}

const CompanyLogoUploader = ({ imageUrl, companyCode, setImageUrl }: CompanyLogoUploaderProps) => {
  const [imageOpenModal, setImageOpenModal] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-1 text-sm font-medium text-gray-600 dark:text-dark-text">회사 로고</p>
      <p className="mb-3 text-xs text-gray-500 dark:text-dark-nav-text">
        (JPEG, JPG, PNG 형식만 지원됩니다.)
      </p>

      <div
        onClick={() => setImageOpenModal(true)}
        className="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-4 border-gray-300 bg-gray-100 shadow-md transition-all hover:bg-gray-200 hover:shadow-lg"
        role="button"
        aria-label="회사 로고 업로드"
      >
        {!imageUrl ? (
          <div className="flex flex-col items-center text-gray-500">
            <Camera className="mb-1 h-8 w-8" />
            <span className="text-sm">로고 업로드</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="로고 이미지"
            className="h-full w-full rounded-full object-cover"
          />
        )}

        {imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <ImageIcon className="h-8 w-8 text-white" />
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
