import { RequestHandler } from "express";
import { container } from "tsyringe";
import { CreateAdminService } from "./create-admin.service";

export class CreateAdminController {
  static handle: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const createAdminService = container.resolve(CreateAdminService);

    const admin = await createAdminService.execute({
      email,
      password,
    });

    return res.json(admin);
  };
}
