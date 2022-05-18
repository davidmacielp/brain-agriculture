import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
}

@injectable()
export class ListRuralProducersService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("RuralProducersRepository")
    private ruralProducersRepository: RuralProducersRepository
  ) {}

  async execute({ adminId }: Request): Promise<RuralProducer[]> {
    const admin = await this.adminsRepository.findOne({
      id: adminId,
    });

    if (!admin) throw AppError.notAllowed();

    const ruralProducers = await this.ruralProducersRepository.find({
      adminId,
    });

    return ruralProducers;
  }
}
