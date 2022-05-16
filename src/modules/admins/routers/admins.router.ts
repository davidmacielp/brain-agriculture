import { Router } from "express";
import { CreateAdminController } from "../services/create-admin/create-admin.controller";

const adminsRouter = Router();

adminsRouter.post("/", CreateAdminController.handle);

export { adminsRouter };
