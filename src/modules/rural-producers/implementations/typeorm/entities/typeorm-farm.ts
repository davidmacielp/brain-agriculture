import { TypeOrmCulture } from "@modules/cultures/implementations/typeorm/entities/typeorm-culture";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import { Column, Entity, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { TypeOrmAddress } from "./typeorm-address";

@Entity()
export class TypeOrmFarm implements Farm {
  @PrimaryColumn()
  id: string;

  @Column()
  ruralProducerId: string;

  @Column()
  label: string;

  @Column()
  totalArea: number;

  @Column()
  usefulArea: number;

  @Column()
  notUsefulArea: number;

  @OneToOne(() => TypeOrmAddress)
  address: TypeOrmAddress;

  @ManyToMany(() => TypeOrmCulture, (culture) => culture.farms)
  cultures: TypeOrmCulture[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
