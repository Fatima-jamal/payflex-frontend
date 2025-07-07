# PayFlex Customer App

This is the customer-facing ReactJS application that allows users to scan merchant-generated QR codes or manually fill out payment forms to simulate digital payments.

## Features

- Home page with scan vs. manual entry options
- QR scanning via device camera
- Manual payment form with merchant ID and reason
- Simulated gateway screen for card input
- Payment confirmation with transaction ID
- Clean UI styled with scoped CSS

## Pages

- `Home.jsx`: Entry point with scan/payment options
- `PayForm.jsx`: Form-based payment
- `QRScanner.jsx`: Camera-based QR reader
- `GatewayScreen.jsx`: Simulated card input
- `Confirmation.jsx`: Payment success message
- `Error.jsx`: Shown for failures

## Technology Stack

- ReactJS
- react-qr-reader
- React Router DOM
- Axios
- Scoped CSS (No Tailwind)
- GitHub Actions (CI)
- Netlify (Hosting)

## Deployment

Live: [https://payflex-app.fatima-jamal.com](https://payflex-app.fatima-jamal.com)

## Setup Instructions

1. Clone the repo  
2. Create `.env` with `REACT_APP_API_URL` pointing to backend  
3. Run using `npm install && npm start`

## License

© 2025 Fatima Jamal – All rights reserved.
