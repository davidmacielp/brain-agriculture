import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { Address } from "@modules/rural-producers/contracts/entities/address";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { inject, injectable } from "tsyringe";

interface Request {
  adminId: string;
  document: {
    type: "CPF" | "CNPJ";
    value: string;
  };
  farm: {
    label: string;
    totalArea: number;
    usefulArea: number;
    notUsefulArea: number;
    address: {
      city: string;
      state: string;
    };
    cultures: string[];
  };
}

@injectable()
export class CreateRuralProducerService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: AdminsRepository,

    @inject("RuralProducersRepository")
    private ruralProducersRepository: RuralProducersRepository
  ) {}

  async execute({ adminId, farm, document }: Request): Promise<RuralProducer> {
    const admin = await this.adminsRepository.findOne({
      id: adminId,
    });

    if (!admin) throw AppError.notAllowed();

    console.log(farm);

    if (farm.usefulArea + farm.notUsefulArea > farm.totalArea)
      throw AppError.inconsistencyArea();

    const farmAddress = new Address(farm.address);

    const newFarm = new Farm({
      ...farm,
      address: farmAddress,
      cultures: [],
    });

    const ruralProducer = this.ruralProducersRepository.create({
      createdBy: adminId,
      farm: newFarm,
      document,
    });

    await this.ruralProducersRepository.save(ruralProducer);

    return ruralProducer;
  }
}
