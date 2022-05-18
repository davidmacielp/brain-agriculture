import { TypeOrmAdmin } from "@modules/admins/implementations/typeorm/entities/typeorm-admin";
import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";
import { DataSource } from "typeorm";

export class TypeOrmProvider implements OrmProvider {
  appDataSource: DataSource;
  async connect(): Promise<void> {
    this.appDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "agriculture",
      entities: [TypeOrmAdmin],
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
