import { Admin } from "../entities/admin";
import { CreateAdminDto } from "../interfaces/create-admin.dto";
import { FindAdminDto } from "../interfaces/find-admin.dto";

export interface AdminsRepository {
  create(data: CreateAdminDto): Admin;
  findOne(data: FindAdminDto): Promise<Admin | undefined>;
  save(data: Admin): Promise<void>;
}
