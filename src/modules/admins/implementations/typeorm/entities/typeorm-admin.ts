import { Admin } from "@modules/admins/contracts/entities/admin";
import { CreateAdminDto } from "@modules/admins/contracts/interfaces/create-admin.dto";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("Admin")
export class TypeOrmAdmin implements Admin {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

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
