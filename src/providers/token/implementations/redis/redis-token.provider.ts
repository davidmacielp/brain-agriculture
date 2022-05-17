import { redisConfig } from "@config/redis.config";
import { CreateTokenDto } from "@providers/token/contracts/dtos/create-token.dto";
import { TokenPayload } from "@providers/token/contracts/dtos/token-payload.dto";
import { TokenProvider } from "@providers/token/contracts/interfaces/token.provider";
import { randomBytes } from "crypto";
import Redis from "ioredis";

// Documentations: "https://github.com/luin/ioredis"
export class RedisTokenProvider implements TokenProvider {
  private client = new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
  });

  // Create a random token.
  //Ex: Key -> "@identifier:token"
  //    Value -> "converted payload to string"
  async createToken({ payload, ttl }: CreateTokenDto): Promise<string> {
    const token = randomBytes(64).toString("hex");

    const parsedPayload = JSON.stringify(payload);

    await this.client.set(`@agri:${token}`, parsedPayload, "EX", ttl);

    return token;
  }

  // Return payload using identifier-> "@identifier:token"
  async getToken(token: string): Promise<TokenPayload | undefined> {
    const payload = await this.client.get(`@agri:${token}`);

    if (!payload) return undefined;

    return JSON.parse(payload);
  }
}
