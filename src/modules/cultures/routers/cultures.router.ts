import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { CreateCultureController } from "../services/create-culture/create-culture.controller";

const culturesRouter = Router();

culturesRouter.use(adminAuthHandler);

culturesRouter.post("/", CreateCultureController.handle);

export { culturesRouter };
