import { CreateRuralProducerDto } from "@modules/rural-producers/contracts/dtos/create-rural-producer.dto";
import { DeleteRuralProducerDto } from "@modules/rural-producers/contracts/dtos/delete-rural-producer.dto";
import { FindRuralProducerDto } from "@modules/rural-producers/contracts/dtos/find-rural-producer.dto";
import { FindRuralProducersDto } from "@modules/rural-producers/contracts/dtos/find-rural-producers.dto";
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

  async find({ adminId }: FindRuralProducersDto): Promise<RuralProducer[]> {
    const ruralProducers = await this.repository.find({
      where: {
        createdBy: adminId,
      },
      relations: ["farm", "farm.address"],
    });

    return ruralProducers;
  }

  async findOne(
    data: FindRuralProducerDto
  ): Promise<RuralProducer | undefined> {
    const ruralProducer = await this.repository.findOne({
      where: {
        id: data.id,
      },
      relations: ["farm", "farm.address"],
    });

    return ruralProducer ? ruralProducer : undefined;
  }

  async delete(data: DeleteRuralProducerDto): Promise<void> {
    await this.repository.delete({
      id: data.id,
    });
  }

  async save(data: RuralProducer): Promise<void> {
    await this.repository.save(data);
  }
}
