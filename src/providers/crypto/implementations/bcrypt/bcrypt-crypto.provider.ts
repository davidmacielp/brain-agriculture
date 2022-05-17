import { CryptoProvider } from "@providers/crypto/contracts/interfaces/crypto.provider";
import bcrypt from "bcrypt";

// Documentation: "https://www.npmjs.com/package/bcrypt".
export class BcryptCryptoProvider implements CryptoProvider {
  // Encrypt one string with 8 rounds
  async encrypt(payload: string): Promise<string> {
    const encryptedPayload = await bcrypt.hash(payload, 8);

    return encryptedPayload;
  }

  // Compare one hash string and text
  async compare({
    hash,
    textToCompare,
  }: {
    hash: string;
    textToCompare: string;
  }): Promise<boolean> {
    const result = await bcrypt.compare(textToCompare, hash);

    return result;
  }
}
