import { Admin } from "../entities/admin";
import { CreateAdminDto } from "../interfaces/create-admin.dto";

export interface AdminsRepository {
  create(data: CreateAdminDto): Admin;
  save(data: Admin): Promise<void>;
}
