import { CreateCultureDto } from "../dtos/create-culture.dto";
import { Culture } from "../entities/culture";

export interface CulturesRepository {
  create(data: CreateCultureDto): Culture;
  save(data: Culture): Promise<void>;
}
