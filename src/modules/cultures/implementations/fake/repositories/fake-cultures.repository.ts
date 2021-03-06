import { CreateCultureDto } from "@modules/cultures/contracts/dtos/create-culture.dto";
import { FindCultureDto } from "@modules/cultures/contracts/dtos/find-cultures.dto";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";

export class FakeCulturesRepository implements CulturesRepository {
  cultures: Culture[] = [];
  create(data: CreateCultureDto): Culture {
    const culture = new Culture(data);

    return culture;
  }

  async find(data: FindCultureDto): Promise<Culture[]> {
    let response = this.cultures.filter(
      (ruralProducer) => ruralProducer.createdBy === data.adminId
    );

    if (data.ids) {
      response = response.filter((ruralProducer) =>
        data.ids?.includes(ruralProducer.id)
      );
    }

    return response;
  }

  async save(data: Culture): Promise<void> {
    this.cultures.push(data);
  }
}
