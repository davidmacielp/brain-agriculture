import { CreateRuralProducerDto } from "../dtos/create-rural-producer.dto";
import { DeleteRuralProducerDto } from "../dtos/delete-rural-producer.dto";
import { FindRuralProducerDto } from "../dtos/find-rural-producer.dto";
import { FindRuralProducersDto } from "../dtos/find-rural-producers.dto";
import { RuralProducer } from "../entities/rural-producer";

export interface RuralProducersRepository {
  create(data: CreateRuralProducerDto): RuralProducer;
  find(data: FindRuralProducersDto): Promise<RuralProducer[]>;
  farmCount(adminId: string): Promise<number>;
  farmArea(adminId: string): Promise<number>;
  findOne(data: FindRuralProducerDto): Promise<RuralProducer | undefined>;
  delete(data: DeleteRuralProducerDto): Promise<void>;
  save(data: RuralProducer): Promise<void>;
}
