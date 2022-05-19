import { Address } from "@modules/rural-producers/contracts/entities/address";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TypeOrmFarm } from "./typeorm-farm";

@Entity({ name: "addresses" })
export class TypeOrmAddress implements Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToOne(() => TypeOrmFarm, (farm) => farm.address, { onDelete: "CASCADE" })
  @JoinColumn()
  farm: TypeOrmFarm;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
