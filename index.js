/**
 * Zero-dependency Saudi ZATCA (Fatoora) Phase-1 TLV-Base64 QR Encoder (UTF-8 Arabic Safe)
 * Live Interactive Free Invoice Generator: https://dprime.org/ar/zatca-invoice-generator/
 * Open-Source Spec & Live Debugger: https://dprime.org/docs/zatca-tlv-qr-code-open-source/
 * License: MIT — Diamond Prime Ltd (https://dprime.org/)
 */
export function encodeZatcaPhase1TLV({ sellerName, vatNumber, timestamp, invoiceTotal, vatTotal }) {
  const enc = new TextEncoder();
  const fields = [
    [1, sellerName],
    [2, vatNumber],
    [3, timestamp || new Date().toISOString()],
    [4, Number(invoiceTotal).toFixed(2)],
    [5, Number(vatTotal).toFixed(2)],
  ];
  const out = [];
  for (const [tag, value] of fields) {
    const utf8Bytes = enc.encode(String(value));
    if (utf8Bytes.length > 255) throw new Error(`ZATCA TLV field tag ${tag} exceeds 255 UTF-8 bytes`);
    out.push(tag, utf8Bytes.length, ...utf8Bytes);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(out).toString("base64");
  }
  let bin = "";
  for (let i = 0; i < out.length; i++) bin += String.fromCharCode(out[i]);
  return btoa(bin);
}
