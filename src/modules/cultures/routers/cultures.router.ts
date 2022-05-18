import { adminAuthHandler } from "@shared/server/middlewares/admin-auth-handler";
import { Router } from "express";
import { CreateCultureController } from "../services/create-culture/create-culture.controller";
import { ListCultureController } from "../services/list-culters/list-cultures.controller";

const culturesRouter = Router();

culturesRouter.use(adminAuthHandler);

culturesRouter.post("/", CreateCultureController.handle);
culturesRouter.get("/", ListCultureController.handle);

export { culturesRouter };
