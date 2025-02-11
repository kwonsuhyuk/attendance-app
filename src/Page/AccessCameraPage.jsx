import QrScan from "../components/QR/QrScan";

function AccessCameraPage({ companyLogo }) {
  return (
    <div>
      <QrScan companyLogo={companyLogo} />
    </div>
  );
}

export default AccessCameraPage;
