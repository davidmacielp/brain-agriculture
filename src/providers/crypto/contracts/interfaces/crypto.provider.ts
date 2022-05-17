import { CompareDto } from "../dtos/compare.dto";

export interface CryptoProvider {
  encrypt(payload: string): Promise<string>;
  compare(data: CompareDto): Promise<boolean>;
}
