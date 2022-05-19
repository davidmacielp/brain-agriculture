import { Address } from "@modules/rural-producers/contracts/entities/address";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { TypeOrmFarm } from "./typeorm-farm";

@Entity({ name: "addresses" })
export class TypeOrmAddress implements Address {
  @PrimaryColumn()
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToOne(() => TypeOrmFarm, (farm) => farm.address, { onDelete: "CASCADE" })
  @JoinColumn()
  farm: TypeOrmFarm;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
