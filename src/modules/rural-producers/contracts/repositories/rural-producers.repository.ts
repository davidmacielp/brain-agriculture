import { CreateRuralProducerDto } from "../dtos/create-rural-producer.dto";
import { RuralProducer } from "../entities/rural-producer";

export interface RuralProducersRepository {
  create(data: CreateRuralProducerDto): RuralProducer;
  save(data: RuralProducer): Promise<void>;
}
