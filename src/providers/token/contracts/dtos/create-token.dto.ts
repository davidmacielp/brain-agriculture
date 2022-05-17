import { TokenPayload } from "./token-payload.dto";

export interface CreateTokenDto {
  payload: TokenPayload;
  ttl: number;
}
