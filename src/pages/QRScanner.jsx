import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode';
import './QRScanner.css';

function QRScanner() {
  const navigate = useNavigate();

  // Handles redirection using query params for better mobile compatibility
  const redirectToPayForm = (merchantId, amount, description) => {
    navigate(
      `/pay?merchantId=${merchantId}&amount=${amount}&description=${encodeURIComponent(description)}`
    );
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
      },
      false
    );

    scanner.render(
      (decodedText) => {
        try {
          if (decodedText.startsWith('payflex://merchant')) {
            const url = new URL(decodedText.replace('payflex://', 'https://'));
            const merchantId = url.searchParams.get('id');
            const amount = url.searchParams.get('amount');
            const description = url.searchParams.get('desc') || '';
            scanner.clear().then(() => redirectToPayForm(merchantId, amount, description));
          } else {
            const parsed = JSON.parse(decodedText);
            const { merchantId, amount, description } = parsed;
            scanner.clear().then(() => redirectToPayForm(merchantId, amount, description));
          }
        } catch (error) {
          console.error('Invalid QR Code:', error);
        }
      },
      (error) => {
        console.warn("QR scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch(e => console.error('Cleanup error:', e));
    };
  }, [navigate]);

  // Upload QR Code image instead of scanning live
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      const decodedText = result;
      if (decodedText.startsWith('payflex://merchant')) {
        const url = new URL(decodedText.replace('payflex://', 'https://'));
        const merchantId = url.searchParams.get('id');
        const amount = url.searchParams.get('amount');
        const description = url.searchParams.get('desc') || '';
        redirectToPayForm(merchantId, amount, description);
      } else {
        const parsed = JSON.parse(decodedText);
        const { merchantId, amount, description } = parsed;
        redirectToPayForm(merchantId, amount, description);
      }
    } catch (err) {
      console.error("QR scan failed:", err);
    }
  };

  return (
    <div className="qr-container">
      <h2>Scan Merchant QR Code</h2>
      <div id="qr-reader" />

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="upload-qr">Or upload QR Code image:</label>
        <input type="file" accept="image/*" id="upload-qr" onChange={handleImageUpload} />
      </div>
    </div>
  );
}

export default QRScanner;
