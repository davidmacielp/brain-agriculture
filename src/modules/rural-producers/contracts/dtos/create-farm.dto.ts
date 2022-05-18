import { Culture } from "@modules/cultures/contracts/entities/culture";
import { Address } from "../entities/address";

export interface CreateFarmDto {
  ruralProducerId: string;
  label: string;
  totalArea: number;
  usefulArea: number;
  notUsefulArea: number;
  address: Address;
  cultures: Culture[];
}
