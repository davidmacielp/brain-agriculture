import { CreateCultureDto } from "@modules/cultures/contracts/dtos/create-culture.dto";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";
import { TypeOrmProvider } from "@providers/orm/implementations/typeorm/typeorm.provider";
import { container } from "tsyringe";
import { Repository } from "typeorm";
import { TypeOrmCulture } from "../entities/typeorm-culture";

export class TypeOrmCulturesRepository implements CulturesRepository {
  private repository: Repository<TypeOrmCulture>;

  constructor() {
    this.repository = container
      .resolve<TypeOrmProvider>("OrmProvider")
      .appDataSource.getRepository(TypeOrmCulture);
  }

  create(data: CreateCultureDto): Culture {
    const culture = this.repository.create(data);

    return culture;
  }

  async save(data: Culture): Promise<void> {
    await this.repository.save(data);
  }
}
