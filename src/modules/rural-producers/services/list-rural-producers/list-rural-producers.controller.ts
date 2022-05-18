import { RequestHandler } from "express";
import { container } from "tsyringe";
import { ListRuralProducersService } from "./list-rural-producers.service";

export class ListRuralProducerController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;

    const listRuralProducersService = container.resolve(
      ListRuralProducersService
    );

    const ruralProducers = await listRuralProducersService.execute({
      adminId: userId,
    });

    return res.json(ruralProducers);
  };
}
