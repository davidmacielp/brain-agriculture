import { Farm } from "../entities/farm";
import { Document } from "./document.dto";

export interface CreateRuralProducerDto {
  document: Document;
  farm: Farm;
  createdBy: string;
}
