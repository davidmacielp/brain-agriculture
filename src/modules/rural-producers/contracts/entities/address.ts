import { v4 } from "uuid";
import { CreateAddressDto } from "../dtos/create-addres.dto";

export class Address {
  id: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateAddressDto) {
    if (data) {
      this.id = v4();
      this.city = data.city;
      this.state = data.state;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
