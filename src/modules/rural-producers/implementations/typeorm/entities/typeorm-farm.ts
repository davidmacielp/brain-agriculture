import { TypeOrmCulture } from "@modules/cultures/implementations/typeorm/entities/typeorm-culture";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { TypeOrmAddress } from "./typeorm-address";
import { TypeOrmRuralProducer } from "./typeorm-rural-producer";

@Entity("farms")
export class TypeOrmFarm implements Farm {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @OneToOne(() => TypeOrmRuralProducer, (ruralProducer) => ruralProducer.farm, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  ruralProducer: TypeOrmRuralProducer;

  @Column()
  totalArea: number;

  @Column()
  usefulArea: number;

  @Column()
  notUsefulArea: number;

  @OneToOne(() => TypeOrmAddress, (address) => address.farm, {
    cascade: true,
  })
  address: TypeOrmAddress;

  @ManyToMany(() => TypeOrmCulture, (culture) => culture.farms)
  @JoinTable()
  cultures: TypeOrmCulture[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
