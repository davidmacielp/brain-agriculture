import { RequestHandler } from "express";
import { container } from "tsyringe";
import { CreateRuralProducerService } from "./create-rural-producer.service";

export class CreateRuralProducerController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;
    const { document, farm } = req.body;

    const createRuralProducerService = container.resolve(
      CreateRuralProducerService
    );

    const ruralProducer = await createRuralProducerService.execute({
      adminId: userId,
      document,
      farm,
    });

    return res.json(ruralProducer);
  };
}
