import { TypeOrmCulture } from "@modules/cultures/implementations/typeorm/entities/typeorm-culture";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import { Column, Entity, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { TypeOrmAddress } from "./typeorm-address";
import { TypeOrmRuralProducer } from "./typeorm-rural-producer";

@Entity()
export class TypeOrmFarm implements Farm {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @OneToOne(() => TypeOrmRuralProducer, (ruralProducer) => ruralProducer.farm)
  ruralProducer: TypeOrmRuralProducer;

  @Column()
  totalArea: number;

  @Column()
  usefulArea: number;

  @Column()
  notUsefulArea: number;

  @OneToOne(() => TypeOrmAddress, (address) => address.id, { cascade: true })
  address: TypeOrmAddress;

  @ManyToMany(() => TypeOrmCulture, (culture) => culture.farms)
  cultures: TypeOrmCulture[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
