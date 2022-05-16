import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";

export class FakeOrmProvider implements OrmProvider {
  connect(): void {
    return undefined;
  }
}
