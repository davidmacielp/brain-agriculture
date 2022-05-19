import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
  ruralProducerId: string;
}

@injectable()
export class DeleteRuralProducerService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("RuralProducersRepository")
    private ruralProducersRepository: RuralProducersRepository
  ) {}

  async execute({ adminId, ruralProducerId }: Request): Promise<void> {
    const admin = await this.adminsRepository.findOne({
      id: adminId,
    });

    if (!admin) throw AppError.notAllowed();

    const ruralProducer = await this.ruralProducersRepository.findOne({
      adminId,
      id: ruralProducerId,
    });

    if (!ruralProducer) throw AppError.ruralProducerNotFound(ruralProducerId);

    await this.ruralProducersRepository.delete({
      id: ruralProducerId,
    });
  }
}
