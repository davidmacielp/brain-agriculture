import { CreateTokenDto } from "@providers/token/contracts/dtos/create-token.dto";
import { TokenPayload } from "@providers/token/contracts/dtos/token-payload.dto";
import { TokenProvider } from "@providers/token/contracts/interfaces/token.provider";
import { randomBytes } from "crypto";

// Fake provider token provider
export class FakeTokenProvider implements TokenProvider {
  private tokens: Record<string, TokenPayload> = {};

  async createToken({ payload }: CreateTokenDto): Promise<string> {
    const token = randomBytes(64).toString("hex");

    this.tokens[`@agri:${token}`] = payload;

    return token;
  }

  async getToken(token: string): Promise<TokenPayload | undefined> {
    const payload = this.tokens[`@agri:${token}`];

    return payload;
  }
}
