import { CryptoProvider } from "@providers/crypto/contracts/interfaces/crypto.provider";

export class FakeCryptoProvider implements CryptoProvider {
  async encrypt(payload: string): Promise<string> {
    return payload;
  }

  async compare({
    hash,
    textToCompare,
  }: {
    hash: string;
    textToCompare: string;
  }): Promise<boolean> {
    return hash === textToCompare;
  }
}
