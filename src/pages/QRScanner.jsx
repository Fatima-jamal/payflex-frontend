import React, { useEffect } from 'react';
import './QRScanner.css';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: 250,
      fps: 10,
    });

    scanner.render(
      (decodedText) => {
        try {
          const qrData = JSON.parse(decodedText);

          if (
            qrData &&
            qrData.merchantId &&
            qrData.amount &&
            qrData.description
          ) {
            const enrichedData = {
              merchantId: qrData.merchantId,
              amount: qrData.amount,
              description: qrData.description,
              customerName: '',
              email: '',
              phone: '',
            };

            scanner.clear().then(() => {
              navigate('/card-entry', { state: enrichedData });
            });
          } else {
            alert('Invalid QR code data.');
          }
        } catch (error) {
          alert('Failed to parse QR code.');
          console.error(error);
        }
      },
      (err) => {
        console.warn('QR Code scan error:', err);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="qr-container">
      <div className="qr-overlay">
        <h2 className="qr-title">Scan QR Code to Begin Payment</h2>
        <p className="qr-subtitle">
          Allow camera access and point to a valid PayFlex QR code.
        </p>
        <div id="qr-reader"></div>
      </div>
    </div>
  );
}

export default QRScanner;
