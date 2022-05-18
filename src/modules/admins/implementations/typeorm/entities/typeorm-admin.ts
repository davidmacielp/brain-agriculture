import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { TypeOrmRuralProducer } from "@modules/rural-producers/implementations/typeorm/entities/typeorm-rural-producer";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("Admin")
export class TypeOrmAdmin implements Admin {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(
    () => TypeOrmRuralProducer,
    (ruralProducer) => ruralProducer.createdBy
  )
  ruralProducers: TypeOrmRuralProducer[];

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  constructor(data: CreateAdminDto) {
    if (data) {
      this.id = v4();
      this.email = data.email;
      this.password = data.password;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
