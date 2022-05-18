import { CreateRuralProducerDto } from "../dtos/create-rural-producer.dto";
import { FindRuralProducersDto } from "../dtos/find-rural-producers.dto";
import { RuralProducer } from "../entities/rural-producer";

export interface RuralProducersRepository {
  create(data: CreateRuralProducerDto): RuralProducer;
  find(data: FindRuralProducersDto): Promise<RuralProducer[]>;
  save(data: RuralProducer): Promise<void>;
}
