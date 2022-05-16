import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";
import { DataSource } from "typeorm";

export class TypeOrmProvider implements OrmProvider {
  connect(): void {
    const appDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "agriculture",
      entities: [],
      synchronize: true,
      logging: true,
    });

    appDataSource
      .initialize()
      .then(() => console.log(`Database is launched`))
      .catch((error) => console.log(error));
  }
}
