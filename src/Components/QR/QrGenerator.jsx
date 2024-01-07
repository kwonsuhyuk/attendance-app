import QRCode from 'qrcode.react';

function QrGenerator() {
  return (
    <div>
      <QRCode value='https://www.youtube.com' />
    </div>
  );
}

export default QrGenerator;
