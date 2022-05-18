import { CreateCultureDto } from "@modules/cultures/contracts/dtos/create-culture.dto";
import { Culture } from "@modules/cultures/contracts/entities/culture";
import { TypeOrmFarm } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-farm";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TypeOrmCulture implements Culture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @ManyToMany(() => TypeOrmFarm, (farm) => farm.cultures)
  farms: TypeOrmFarm[];

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: CreateCultureDto) {
    if (data) {
      this.label = data.label;
      this.createdBy = data.createdBy;
    }
  }
}
