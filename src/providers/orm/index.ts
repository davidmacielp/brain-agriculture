import { container } from "tsyringe";
import { OrmProvider } from "./contracts/interfaces/orm.provider";
import { TypeOrmProvider } from "./implementations/typeorm/typeorm.provider";

container.registerSingleton<OrmProvider>("OrmProvider", TypeOrmProvider);
