import { appConfig } from "@config/app.config";
import { postgresConfig } from "@config/postgres.config";
import { TypeOrmAdmin } from "@modules/admins/implementations/typeorm/entities/typeorm-admin";
import { TypeOrmCulture } from "@modules/cultures/implementations/typeorm/entities/typeorm-culture";
import { TypeOrmAddress } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-address";
import { TypeOrmFarm } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-farm";
import { TypeOrmRuralProducer } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-rural-producer";
import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";
import { DataSource } from "typeorm";

export class TypeOrmProvider implements OrmProvider {
  appDataSource: DataSource;
  async connect(): Promise<void> {
    this.appDataSource = new DataSource({
      type: "postgres",
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: [
        TypeOrmAdmin,
        TypeOrmRuralProducer,
        TypeOrmFarm,
        TypeOrmAddress,
        TypeOrmCulture,
      ],
      synchronize: true,
      logging: false,
    });

    try {
      await this.appDataSource.initialize();
    } catch (error) {
      console.log(error);
    }
    console.log("Connected to the database");
  }
}
