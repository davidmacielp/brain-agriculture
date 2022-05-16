import { v4 } from "uuid";
import { CreateAdminDto } from "../interfaces/create-admin.dto";

export class Admin {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
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
