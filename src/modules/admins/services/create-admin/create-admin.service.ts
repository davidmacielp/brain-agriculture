import { Admin } from "@modules/admins/contracts/entities/admin";
import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { CryptoProvider } from "@providers/crypto/contracts/interfaces/crypto.provider";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  email: string;
  password: string;
}

@injectable()
export class CreateAdminService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("CryptoProvider")
    private cryptoProvider: CryptoProvider
  ) {}
  async execute({ email, password }: Request): Promise<Admin> {
    const checkEmailIsInUse = await this.adminsRepository.findOne({
      email,
    });

    if (checkEmailIsInUse) throw AppError.emailInUse(email);

    const encryptedPassword = await this.cryptoProvider.encrypt(password);

    const admin = this.adminsRepository.create({
      email,
      password: encryptedPassword,
    });

    await this.adminsRepository.save(admin);

    return admin;
  }
}
