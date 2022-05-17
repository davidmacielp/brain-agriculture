import { appAuthHandler } from "@shared/server/middlewares/app-auth-handler";
import { Router } from "express";
import { AuthenticateAdminController } from "../services/authenticate-admin/authenticate-admin.controller";
import { CreateAdminController } from "../services/create-admin/create-admin.controller";

const adminsRouter = Router();

adminsRouter.post(
  "/",
  appAuthHandler,
  CreateAdminController.validate,
  CreateAdminController.handle
);

adminsRouter.post(
  "/auth",
  AuthenticateAdminController.validate,
  AuthenticateAdminController.handle
);

export { adminsRouter };
