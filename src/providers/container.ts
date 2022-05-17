import { AdminsRepository } from "@modules/admins/contracts/repositories/admin.repository";
import { TypeOrmAdminsRepository } from "@modules/admins/implementations/typeorm/repositories/typeorm-admins.repository";
import { container } from "tsyringe";
import "./orm/index";
import "./crypto/index";

container.registerSingleton<AdminsRepository>(
  "AdminsRepository",
  TypeOrmAdminsRepository
);
