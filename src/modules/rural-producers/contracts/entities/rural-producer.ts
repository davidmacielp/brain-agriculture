import { v4 } from "uuid";
import { CreateRuralProducerDto } from "../dtos/create-rural-producer.dto";
import { Farm } from "./farm";
import { Document } from "../dtos/document.dto";

export class RuralProducer {
  id: string;

  farm: Farm;

  document: Document;

  createdBy: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: CreateRuralProducerDto) {
    if (data) {
      this.id = v4();
      this.document = data.document;
      this.farm = data.farm;
      this.createdBy = data.createdBy;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
