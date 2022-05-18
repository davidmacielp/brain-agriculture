import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { FindAdminDto } from "@modules/admins/contracts/interfaces/find-admin.dto";
import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { TypeOrmProvider } from "@providers/orm/implementations/typeorm/typeorm.provider";
import { container } from "tsyringe";
import { Repository } from "typeorm";
import { TypeOrmAdmin } from "../entities/typeorm-admin";

export class TypeOrmAdminsRepository implements AdminsRepository {
  adminsRepository: Repository<TypeOrmAdmin>;

  constructor() {
    this.adminsRepository = container
      .resolve<TypeOrmProvider>("OrmProvider")
      .appDataSource.getRepository(TypeOrmAdmin);
  }

  create(data: CreateAdminDto): Admin {
    const admin = new TypeOrmAdmin(data);

    return admin;
  }

  async findOne({ id, email }: FindAdminDto): Promise<Admin | undefined> {
    const admin = await this.adminsRepository.findOneBy({
      ...(id && { id }),
      ...(email && { email }),
    });

    return admin ? admin : undefined;
  }

  async save(data: Admin): Promise<void> {
    await this.adminsRepository.save(data);
  }
}
