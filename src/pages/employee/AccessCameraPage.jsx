import OutWorkingModal from "@/components/common/modal/OutWorkingModal";
import CompanyInfoHeader from "@/components/employee/CompanyInfoHeader";
import QrScan from "@/components/employee/qr/QrScan";

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
