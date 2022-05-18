import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

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

    if (!admin) throw AppError.notAllowed();

    const culture = this.culturesRepository.create({
      label,
      createdBy: admin.id,
    });

    await this.culturesRepository.save(culture);

    return culture;
  }
}
