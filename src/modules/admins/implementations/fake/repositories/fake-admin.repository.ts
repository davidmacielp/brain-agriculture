import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { AdminsRepository } from "@modules/admins/contracts/repositories/admin.repository";

export class FakeAdminRepository implements AdminsRepository {
  create(data: CreateAdminDto): Admin {
    const admin = new Admin({
      email: data.email,
      password: data.password,
    });

    return admin;
  }

  save(_: Admin): Promise<void> {
    return Promise.resolve(undefined);
  }
}
