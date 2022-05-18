import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
}

@injectable()
export class ListCulturesService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("CulturesRepository")
    private culturesRepository: CulturesRepository
  ) {}

  async execute({ adminId }: Request): Promise<Culture[]> {
    const admin = await this.adminsRepository.findOne({
      id: adminId,
    });

    if (!admin) throw AppError.notAllowed();

    const cultures = await this.culturesRepository.find({
      adminId,
    });

    return cultures;
  }
}
