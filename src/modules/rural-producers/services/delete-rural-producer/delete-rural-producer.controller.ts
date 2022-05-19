import { RequestHandler } from "express";
import { container } from "tsyringe";
import { DeleteRuralProducerService } from "./delete-rural-producer.service";

export class DeleteRuralProducerController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;
    const { ruralProducerId } = req.params;

    const deleteRuralProducerService = container.resolve(
      DeleteRuralProducerService
    );

    const ruralProducer = await deleteRuralProducerService.execute({
      adminId: userId,
      ruralProducerId,
    });

    return res.json(ruralProducer);
  };
}
