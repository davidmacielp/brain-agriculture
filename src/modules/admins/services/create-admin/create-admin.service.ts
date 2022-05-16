import { Admin } from "@modules/admins/contracts/entities/admin";
import { AdminsRepository } from "@modules/admins/contracts/repositories/admin.repository";
import { inject, injectable } from "tsyringe";

interface Request {
  email: string;
  password: string;
}

@injectable()
export class CreateAdminService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository
  ) {}
  async execute({ email, password }: Request): Promise<Admin> {
    const admin = this.adminsRepository.create({
      email,
      password,
    });

    console.log(admin);

    await this.adminsRepository.save(admin);

    return admin;
  }
}
