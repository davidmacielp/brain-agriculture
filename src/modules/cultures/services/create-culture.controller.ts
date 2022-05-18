import { RequestHandler } from "express";
import { container } from "tsyringe";
import { CreateCultureService } from "./create-culture.service";

export class CreateCultureController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;

    const { label } = req.body;

    const createCultureService = container.resolve(CreateCultureService);

    const culture = await createCultureService.execute({
      adminId: userId,
      label,
    });

    return res.json(culture);
  };
}
