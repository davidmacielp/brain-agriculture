import { container } from "tsyringe";
import { TokenProvider } from "./contracts/interfaces/token.provider";
import { RedisTokenProvider } from "./implementations/redis/redis-token.provider";

container.registerSingleton<TokenProvider>("TokenProvider", RedisTokenProvider);
