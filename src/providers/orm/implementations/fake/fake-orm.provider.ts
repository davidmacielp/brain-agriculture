import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";

export class FakeOrmProvider implements OrmProvider {
  connect(): void {
    console.log("FakeOrm provider is launched");
  }
}
