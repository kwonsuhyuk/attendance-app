import { Button } from "@/components/ui/button";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useMyVacation } from "@/hooks/employee/useMyVacation";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import VacationRequestModal from "@/components/common/modal/VacationRequestModal";

const MyVacationPage = () => {
  const { isModalOpen, toggleModal } = useMyVacation();
  const { requests } = useVacationRequests();
  const { register: handleRequest } = requests;

  const handleSubmit = (data: IVacationRequest) => {
    handleRequest(data);
  };

  return (
    <div className="p-3">
      <div>
        <Button className="w-full cursor-pointer" onClick={toggleModal}>
          휴가 요청
        </Button>
      </div>

      {isModalOpen && <VacationRequestModal onClose={toggleModal} onRegister={handleSubmit} />}
    </div>
  );
};

export default MyVacationPage;
