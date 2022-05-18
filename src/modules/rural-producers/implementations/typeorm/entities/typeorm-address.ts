import { Address } from "@modules/rural-producers/contracts/entities/address";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "Address" })
export class TypeOrmAddress implements Address {
  @PrimaryColumn()
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
