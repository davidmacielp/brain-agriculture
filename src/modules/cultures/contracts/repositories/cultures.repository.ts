import { CreateCultureDto } from "../dtos/create-culture.dto";
import { FindCultureDto } from "../dtos/find-cultures.dto";
import { Culture } from "../entities/culture";

export interface CulturesRepository {
  create(data: CreateCultureDto): Culture;
  find(data: FindCultureDto): Promise<Culture[]>;
  save(data: Culture): Promise<void>;
}
