import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { TypeOrmRuralProducer } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-rural-producer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("admins")
export class TypeOrmAdmin implements Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => TypeOrmRuralProducer, (ruralProducer) => ruralProducer.admin)
  ruralProducers: TypeOrmRuralProducer[];

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: CreateAdminDto) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
    }
  }
}
