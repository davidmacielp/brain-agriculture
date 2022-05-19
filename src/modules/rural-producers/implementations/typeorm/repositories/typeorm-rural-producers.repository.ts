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
      relations: ["farm", "farm.address", "farm.cultures"],
    });

    return ruralProducers;
  }

  async farmCount(adminId: string): Promise<number> {
    const farmCount = await this.repository.count({
      where: {
        createdBy: adminId,
      },
    });

    return farmCount;
  }

  async farmArea(adminId: string): Promise<number> {
    console.log(adminId);
    const result = await this.repository
      .createQueryBuilder("rural_producers")
      .leftJoinAndSelect("rural_producers.farm", "farms")
      .where("rural_producers.createdBy = :id", { id: adminId })
      .select("SUM(farms.totalArea)", "sum")
      .getRawOne();

    return Number(result.sum);
  }

  async findOne(
    data: FindRuralProducerDto
  ): Promise<RuralProducer | undefined> {
    const ruralProducer = await this.repository.findOne({
      where: {
        id: data.id,
      },
      relations: ["farm", "farm.address", "farm.cultures"],
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
