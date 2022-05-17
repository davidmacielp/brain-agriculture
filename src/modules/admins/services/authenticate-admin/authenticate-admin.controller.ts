import { celebrate, Joi } from "celebrate";
import { RequestHandler } from "express";
import { container } from "tsyringe";
import { AuthenticateAdminService } from "./authenticate-admin.service";

export class AuthenticateAdminController {
  static validate = celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });

  static handle: RequestHandler = (req, res) => {
    const { email, password } = req.body;

    const authenticateAdminService = container.resolve(
      AuthenticateAdminService
    );

    const token = authenticateAdminService.execute({
      email,
      password,
    });

    return res.json(token);
  };
}
