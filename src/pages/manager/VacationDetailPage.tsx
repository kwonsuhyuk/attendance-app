import VacationModal from "@/components/common/modal/VacationRegisterModal";
import { useState } from "react";

const VacationDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">휴가 등록</h1>
      <button
        className="cursor-pointer rounded border-none bg-point-color px-4 py-2 text-black"
        onClick={toggleModal}
      >
        휴가 등록 +
      </button>

      {isModalOpen && <VacationModal onClose={toggleModal} />}
    </div>
  );
};

export default VacationDetailPage;
