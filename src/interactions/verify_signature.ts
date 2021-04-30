import { sign } from "./deps.ts";

export function verifySignature(
  { publicKey, signature, timestamp, body }: VerifySignatureOptions,
): { isValid: boolean; body: string } {
  const isValid = sign.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(publicKey),
  );

  return { isValid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}

export interface VerifySignatureOptions {
  publicKey: string;
  signature: string;
  timestamp: string;
  body: string;
}