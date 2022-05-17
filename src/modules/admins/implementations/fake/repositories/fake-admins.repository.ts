import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { FindAdminDto } from "@modules/admins/contracts/interfaces/find-admin.dto";
import { AdminsRepository } from "@modules/admins/contracts/repositories/admin.repository";

export class FakeAdminsRepository implements AdminsRepository {
  private admins: Admin[] = [];

  create(data: CreateAdminDto): Admin {
    const admin = new Admin({
      email: data.email,
      password: data.password,
    });

    return admin;
  }

  async findOne({ id, email }: FindAdminDto): Promise<Admin | undefined> {
    const admin = this.admins.find(
      (item) => item.email === email || item.id === id
    );

    return admin;
  }

  save(): Promise<void> {
    return Promise.resolve();
  }
}
