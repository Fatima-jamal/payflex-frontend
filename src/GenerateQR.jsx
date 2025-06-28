import React from 'react';
import { QRCode } from 'qrcode.react';

function GenerateQR({ merchantId, amount, description }) {
  const payload = `payflex://merchant?id=${merchantId}&amount=${amount}&desc=${encodeURIComponent(description)}`;

  return (
    <div>
      <h3>Scan to Pay</h3>
      <QRCode value={payload} size={200} />
      <p>{payload}</p> {/* For testing */}
    </div>
  );
}

export default GenerateQR;
