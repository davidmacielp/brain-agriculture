import { CreateTokenDto } from "../dtos/create-token.dto";
import { TokenPayload } from "../dtos/token-payload.dto";

// Interface de provider, responsável por gerar e armazenar tokens.
export interface TokenProvider {
  createToken(data: CreateTokenDto): Promise<string>;
  getToken(token: string): Promise<TokenPayload | undefined>;
}
