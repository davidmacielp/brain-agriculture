import { CreateCultureDto } from "@modules/cultures/contracts/dtos/create-culture.dto";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";

export class FakeCulturesRepository implements CulturesRepository {
  cultures: Culture[] = [];
  create(data: CreateCultureDto): Culture {
    const culture = new Culture(data);

    return culture;
  }

  async save(data: Culture): Promise<void> {
    this.cultures.push(data);
  }
}
