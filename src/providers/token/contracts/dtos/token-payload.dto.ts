import { TokenType } from "../enums/token-type.enum";

export interface TokenPayload {
  type: TokenType;
  owner: string;
}
