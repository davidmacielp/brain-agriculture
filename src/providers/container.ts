// Import and regiter all repositories and providers

import { AdminsRepository } from "@modules/admins/contracts/repositories/admins.repository";
import { TypeOrmAdminsRepository } from "@modules/admins/implementations/typeorm/repositories/typeorm-admins.repository";
import { container } from "tsyringe";
import "./orm/index";
import "./crypto/index";
import "./token/index";
import { RuralProducersRepository } from "@modules/rural-producers/contracts/repositories/rural-producers.repository";
import { TypeOrmRuralProducersRepository } from "@modules/rural-producers/implementations/typeorm/repositories/typeorm-rural-producers.repository";
import { CulturesRepository } from "@modules/cultures/contracts/repositories/cultures.repository";
import { TypeOrmCulturesRepository } from "@modules/cultures/implementations/typeorm/repositories/typeorm-cultures.repository";

container.registerSingleton<AdminsRepository>(
  "AdminsRepository",
  TypeOrmAdminsRepository
);

container.registerSingleton<RuralProducersRepository>(
  "RuralProducersRepository",
  TypeOrmRuralProducersRepository
);

container.registerSingleton<CulturesRepository>(
  "CulturesRepository",
  TypeOrmCulturesRepository
);
