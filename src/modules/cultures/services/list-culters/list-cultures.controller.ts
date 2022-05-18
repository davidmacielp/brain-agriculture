import { RequestHandler } from "express";
import { container } from "tsyringe";
import { ListCulturesService } from "./list-cultures.service";

export class ListCultureController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;

    const listCulturesService = container.resolve(ListCulturesService);

    const cultures = await listCulturesService.execute({
      adminId: userId,
    });

    return res.json(cultures);
  };
}
