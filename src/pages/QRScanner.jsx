import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './QRScanner.css';

function QRScanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        try {
          // Support both formats: URL-like or JSON-like
          if (decodedText.startsWith('payflex://merchant')) {
            const url = new URL(decodedText.replace('payflex://', 'https://'));
            const merchantId = url.searchParams.get('id');
            const amount = url.searchParams.get('amount');
            const description = url.searchParams.get('desc');
            scanner.clear().then(() => {
              navigate('/pay', {
                state: {
                  merchantId,
                  amount,
                  description
                }
              });
            });
          } else {
            const parsed = JSON.parse(decodedText);
            scanner.clear().then(() => {
              navigate('/pay', {
                state: {
                  merchantId: parsed.merchantId,
                  amount: parsed.amount,
                  description: parsed.description
                }
              });
            });
          }
        } catch (error) {
          console.error('Invalid QR Code', error);
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

  return (
    <div className="qr-container">
      <h2>Scan Merchant QR Code</h2>
      <div id="qr-reader" />
    </div>
  );
}

export default QRScanner;
