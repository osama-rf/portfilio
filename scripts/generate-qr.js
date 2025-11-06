import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your website URL - change this to your actual deployed URL
const websiteURL = 'https://osama-portfolio.vercel.app';

// QR Code options with your theme colors
const options = {
  errorCorrectionLevel: 'H',
  type: 'png',
  quality: 1,
  margin: 2,
  width: 512,
  color: {
    dark: '#6366f1',  // Primary color (indigo)
    light: '#ffffff'   // White background
  }
};

// Generate QR Code
QRCode.toFile(
  join(__dirname, '../public/qr-code.png'),
  websiteURL,
  options,
  (err) => {
    if (err) {
      console.error('Error generating QR code:', err);
      process.exit(1);
    }
    console.log('✅ QR code generated successfully at public/qr-code.png');
    console.log(`📱 URL: ${websiteURL}`);
  }
);
