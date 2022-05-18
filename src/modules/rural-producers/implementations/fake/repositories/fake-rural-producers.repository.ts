import { CreateRuralProducerDto } from "@modules/rural-producers/contracts/dtos/create-rural-producer.dto";
import { DeleteRuralProducerDto } from "@modules/rural-producers/contracts/dtos/delete-rural-producer.dto";
import { FindRuralProducerDto } from "@modules/rural-producers/contracts/dtos/find-rural-producer.dto";
import { FindRuralProducersDto } from "@modules/rural-producers/contracts/dtos/find-rural-producers.dto";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";

export class FakeRuralProducersRepository implements RuralProducersRepository {
  ruralProducers: RuralProducer[] = [];

  create(data: CreateRuralProducerDto): RuralProducer {
    const ruralProducer = new RuralProducer(data);

    return ruralProducer;
  }

  async find(data: FindRuralProducersDto): Promise<RuralProducer[]> {
    return this.ruralProducers.filter(
      (ruralProducer) => ruralProducer.createdBy === data.adminId
    );
  }

  async save(data: RuralProducer): Promise<void> {
    this.ruralProducers.push(data);
  }

  async findOne(
    data: FindRuralProducerDto
  ): Promise<RuralProducer | undefined> {
    return this.ruralProducers.find(
      (ruralProducer) =>
        ruralProducer.id === data.id && ruralProducer.createdBy === data.adminId
    );
  }

  async delete(data: DeleteRuralProducerDto): Promise<void> {
    const ruralProducerindex = this.ruralProducers.findIndex(
      (ruralProducer) => ruralProducer.id === data.id
    );

    this.ruralProducers.splice(ruralProducerindex, ruralProducerindex + 1);
  }
}
