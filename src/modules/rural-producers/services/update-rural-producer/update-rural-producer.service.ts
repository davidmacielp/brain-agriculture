import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
  ruralProducerId: string;
  document?: {
    type: "CPF" | "CNPJ";
    value: string;
  };
  farm?: {
    label: string;
    totalArea: number;
    usefulArea: number;
    notUsefulArea: number;
    address: {
      city: string;
      state: string;
    };
    cultures?: string[];
  };
}

@injectable()
export class UpdateRuralProducerService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("RuralProducersRepository")
    private ruralProducersRepository: RuralProducersRepository,

    @inject("CulturesRepository")
    private culturesRepository: CulturesRepository
  ) {}

  async execute({
    adminId,
    ruralProducerId,
    farm,
    document,
  }: Request): Promise<RuralProducer> {
    const admin = await this.adminsRepository.findOne({
      id: adminId,
    });

    if (!admin) throw AppError.notAllowed();

    const ruralProducer = await this.ruralProducersRepository.findOne({
      id: ruralProducerId,
      adminId,
    });

    if (!ruralProducer) throw AppError.notAllowed();

    if (farm) {
      if (
        (farm.usefulArea || ruralProducer.farm.usefulArea) +
          (farm.notUsefulArea || ruralProducer.farm.notUsefulArea) >
        (farm.totalArea || ruralProducer.farm.totalArea)
      )
        throw AppError.inconsistencyArea();

      if (farm.address) {
        ruralProducer.farm.address.city = farm.address.city;
        ruralProducer.farm.address.state = farm.address.state;
        ruralProducer.farm.address.updatedAt = new Date();
      }

      if (farm.cultures) {
        const cultures = await this.culturesRepository.find({
          adminId,
          ids: farm.cultures,
        });

        ruralProducer.farm.cultures = cultures;
      }

      if (farm.label) ruralProducer.farm.label = farm.label;
      if (farm.notUsefulArea)
        ruralProducer.farm.notUsefulArea = farm.notUsefulArea;
      if (farm.usefulArea) ruralProducer.farm.usefulArea = farm.usefulArea;
      if (farm.totalArea) ruralProducer.farm.totalArea = farm.totalArea;
      ruralProducer.farm.updatedAt = new Date();
    }

    if (document) ruralProducer.document = document;

    ruralProducer.farm.updatedAt = new Date();

    await this.ruralProducersRepository.save(ruralProducer);

    return ruralProducer;
  }
}
