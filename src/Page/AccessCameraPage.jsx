import QrScan from '../Components/QR/QrScan';

function AccessCameraPage({ companyLogo }) {
  return (
    <div>
      <QrScan companyLogo={companyLogo} />
    </div>
  );
}

export default AccessCameraPage;
