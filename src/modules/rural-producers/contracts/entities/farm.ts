import { Culture } from "@modules/cultures/contracts/entities/culture";
import { v4 } from "uuid";
import { CreateFarmDto } from "../dtos/create-farm.dto";
import { Address } from "./address";

export class Farm {
  id: string;
  label: string;
  totalArea: number;
  usefulArea: number;
  notUsefulArea: number;
  address: Address;
  cultures: Culture[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateFarmDto) {
    if (data) {
      this.id = v4();
      this.label = data.label;
      this.totalArea = data.totalArea;
      this.usefulArea = data.usefulArea;
      this.notUsefulArea = data.notUsefulArea;
      this.address = data.address;
      this.cultures = data.cultures;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
