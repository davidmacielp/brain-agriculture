import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { CryptoProvider } from "@providers/crypto/contracts/interfaces/crypto.provider";
import { TokenType } from "@providers/token/contracts/enums/token-type.enum";
import { TokenProvider } from "@providers/token/contracts/interfaces/token.provider";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateAdminService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("CryptoProvider")
    private cryptoProvider: CryptoProvider,

    @inject("TokenProvider")
    private tokenProvider: TokenProvider
  ) {}

  async execute({ email, password }: Request): Promise<{ token: string }> {
    const admin = await this.adminsRepository.findOne({ email });

    if (!admin) throw AppError.adminNotFound(email);

    const validPassword = await this.cryptoProvider.compare({
      hash: admin.password,
      textToCompare: password,
    });

    if (!validPassword) throw AppError.invalidEmailAndPasswordCombination();

    const token = await this.tokenProvider.createToken({
      payload: {
        owner: admin.id,
        type: TokenType.ADMIN_AUTHENTICATION,
      },
      ttl: 30 * 60, // 30 min
    });

    return {
      token,
    };
  }
}
