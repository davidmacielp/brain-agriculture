import { CreateRuralProducerDto } from "@modules/rural-producers/contracts/dtos/create-rural-producer.dto";
import { DeleteRuralProducerDto } from "@modules/rural-producers/contracts/dtos/delete-rural-producer.dto";
import { FindRuralProducerDto } from "@modules/rural-producers/contracts/dtos/find-rural-producer.dto";
import { FindRuralProducersDto } from "@modules/rural-producers/contracts/dtos/find-rural-producers.dto";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { TypeOrmProvider } from "@providers/orm/implementations/typeorm/typeorm.provider";
import { container } from "tsyringe";
import { TypeOrmFarm } from "../entities/typeorm-farm";
import { TypeOrmRuralProducer } from "../entities/typeorm-rural-producer";

export class TypeOrmRuralProducersRepository
  implements RuralProducersRepository
{
  repository = container
    .resolve<TypeOrmProvider>("OrmProvider")
    .appDataSource.getRepository(TypeOrmRuralProducer);

  create(data: CreateRuralProducerDto): RuralProducer {
    const ruralProducer = this.repository.create(data);

    return ruralProducer;
  }

  async find({ adminId }: FindRuralProducersDto): Promise<RuralProducer[]> {
    const ruralProducers = await this.repository.find({
      where: {
        createdBy: adminId,
      },
      relations: ["farm", "farm.address"],
    });

    return ruralProducers;
  }

  findOne(data: FindRuralProducerDto): Promise<RuralProducer | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(data: DeleteRuralProducerDto): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async save(data: RuralProducer): Promise<void> {
    await this.repository.save(data);
  }
}
