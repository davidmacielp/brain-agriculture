import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";
import { Culture } from "../contracts/entities/culture";
import { CulturesRepository } from "../contracts/repositories/cultures.repository";

interface Request {
  adminId: string;
  label: string;
}

@injectable()
export class CreateCultureService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("CulturesRepository")
    private culturesRepository: CulturesRepository
  ) {}

  async execute({ adminId, label }: Request): Promise<Culture> {
    const admin = await this.adminsRepository.findOne({ id: adminId });

    if (!admin) throw AppError.adminNotFound(adminId);

    const culture = this.culturesRepository.create({
      label,
      createdBy: admin.id,
    });

    await this.culturesRepository.save(culture);

    return culture;
  }
}
