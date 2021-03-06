import { TypeOrmAdmin } from "@modules/admins/implementations/typeorm/entities/typeorm-admin";
import { Document } from "@modules/rural-producers/contracts/dtos/document.dto";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TypeOrmFarm } from "./typeorm-farm";

@Entity("rural_producers")
export class TypeOrmRuralProducer implements RuralProducer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => TypeOrmFarm, (farm) => farm.ruralProducer, {
    cascade: true,
  })
  farm: TypeOrmFarm;

  @Column({ type: "json" })
  document: Document;

  @Column()
  createdBy: string;

  @ManyToOne(() => TypeOrmAdmin, (admin) => admin.ruralProducers, {
    cascade: true,
  })
  @JoinColumn({ name: "createdBy", referencedColumnName: "id" })
  admin: TypeOrmAdmin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
