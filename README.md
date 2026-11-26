# zatca-phase1-tlv-qr-js

Zero-dependency, UTF-8 Arabic-safe **Saudi ZATCA (Fatoora) Phase-1 TLV-Base64 QR Code** encoder for modern browsers and Node.js.

- **Live Free Arabic ZATCA Invoice Generator (PDF + QR, Zero Signup):** https://dprime.org/ar/zatca-invoice-generator/
- **Interactive TLV Hex/Base64 Live Debugger:** https://dprime.org/docs/zatca-tlv-qr-code-open-source/

## Why UTF-8 Byte Length Matters
A frequent bug when generating Saudi simplified tax invoice QR codes in JavaScript is passing `sellerName.length` instead of UTF-8 byte length. Arabic characters use 2 bytes in UTF-8, so using `TextEncoder().encode()` guarantees 100% compatibility with the official ZATCA Fatoora QR scanner app.

## Usage
```js
import { encodeZatcaPhase1TLV } from './index.js';

const base64Qr = encodeZatcaPhase1TLV({
  sellerName: 'مؤسسة النجاح التجارية',
  vatNumber: '300000000000003',
  timestamp: '2026-11-26T12:00:00Z',
  invoiceTotal: 1150.00,
  vatTotal: 150.00,
});
console.log(base64Qr);
```

Maintained by [Diamond Prime Ltd](https://dprime.org/) (UK Companies House No. 16673979).
