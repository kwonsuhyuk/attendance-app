import OutWorkingModal from "@/components/modal/OutWorkingModal";
import QrScan from "../components/QR/QrScan";
import CompanyInfoHeader from "@/components/employee/CompanyInfoHeader";

const AccessCameraPage = () => {
  return (
    <div className="flex flex-col gap-10" data-tour="step-35">
      <CompanyInfoHeader />
      <QrScan />
      <OutWorkingModal />
    </div>
  );
};

export default AccessCameraPage;
