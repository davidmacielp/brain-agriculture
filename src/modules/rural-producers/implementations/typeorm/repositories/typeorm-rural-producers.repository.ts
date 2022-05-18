import { CreateRuralProducerDto } from "@modules/rural-producers/contracts/dtos/create-rural-producer.dto";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { TypeOrmProvider } from "@providers/orm/implementations/typeorm/typeorm.provider";
import { container } from "tsyringe";
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

  async save(data: RuralProducer): Promise<void> {
    await this.repository.save(data);
  }
}
