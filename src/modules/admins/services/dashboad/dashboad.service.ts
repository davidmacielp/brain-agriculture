import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
}

@injectable()
export class DashboardService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("RuralProducersRepository")
    private ruralProducersRepository: RuralProducersRepository
  ) {}

  async execute({
    adminId,
  }: Request): Promise<{ totalFarmArea: number; totalFarmCount: number }> {
    const admin = await this.adminsRepository.findOne({ id: adminId });

    if (!admin) throw AppError.notAllowed();

    const totalFarmCount = await this.ruralProducersRepository.farmCount(
      adminId
    );

    const totalFarmArea = await this.ruralProducersRepository.farmArea(adminId);

    return { totalFarmArea, totalFarmCount };
  }
}
