import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import { v4 } from "uuid";
import { CreateCultureDto } from "../dtos/create-culture.dto";

export class Culture {
  id: string;

  label: string;

  farms: Farm[];

  createdBy: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: CreateCultureDto) {
    if (data) {
      this.id = v4();
      this.label = data.label;
      this.createdBy = data.createdBy;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
