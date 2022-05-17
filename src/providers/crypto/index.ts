import { container } from "tsyringe";
import { CryptoProvider } from "./contracts/interfaces/crypto.provider";
import { BcryptCryptoProvider } from "./implementations/bcrypt/bcrypt-crypto.provider";

container.registerSingleton<CryptoProvider>(
  "CryptoProvider",
  BcryptCryptoProvider
);
