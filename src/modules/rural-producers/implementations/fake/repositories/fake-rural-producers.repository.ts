import { CreateRuralProducerDto } from "@modules/rural-producers/contracts/dtos/create-rural-producer.dto";
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
}
