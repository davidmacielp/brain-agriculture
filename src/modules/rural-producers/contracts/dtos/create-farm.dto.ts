import { Address } from "../entities/address";

export interface CreateFarmDto {
  label: string;
  totalArea: number;
  usefulArea: number;
  notUsefulArea: number;
  address: Address;
  cultures: string[];
}
